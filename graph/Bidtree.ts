import { Contributed, Lottery, Offset } from '../generated/Bidtree/Bidtree'
import * as schema from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

// mapping file

export function handleContributed(event: Contributed): void {
    let contribute = new schema.Contribution(event.transaction.hash.toHex())
    contribute.timestamp = event.block.timestamp
    contribute.user = event.params.user
    contribute.referralAddress = event.params.refadr
    contribute.amount = event.params.amount
    contribute.toReferral = event.params.referral
    contribute.toFund = event.params.fund
    contribute.toLottery = event.params.lottery
    contribute.toMarketing = event.params.marketing
    contribute.toOwner = event.params.toOwner
    contribute.discount = event.params.refund
    contribute.save()

    // get future lottery instance
    let lottery = schema.FutureLottery.load('future-lottery')

    // increase lottery bank
    if (lottery === null) {
        lottery = new schema.FutureLottery('future-lottery')
        lottery.bank = event.params.lottery
        lottery.participantIds = [event.params.user]
    } else {
        lottery.bank = event.params.lottery.plus(lottery.bank)
        let pIDs = lottery.participantIds
        pIDs.push(event.params.user)
        lottery.participantIds = pIDs
    }

    // add new participant or increase contributed if already participated
    let participant = schema.LotteryParticipant.load(event.params.user)
    if (participant === null) {
        let participant = new schema.LotteryParticipant(event.params.user)
        participant.address = event.params.user
        participant.contributed = event.params.lottery
        participant.lottery = 'future-lottery'
        participant.save()
    } else {
        participant.contributed = event.params.lottery.plus(participant.contributed)
    }

    lottery.save()
}

export function handleOffset(event: Offset): void {
    let offset = new schema.Refund(event.transaction.hash.toHex())
    offset.timestamp = event.block.timestamp
    offset.user = event.params.user
    offset.bidNumber = event.params.number
    offset.amountRefunded = event.params.amount
    offset.fromBank = event.params.price
    offset.save()
}

export function handleLottery(event: Lottery): void {
    let lottery = new schema.Lottery(event.transaction.hash.toHex())
    lottery.timestamp = event.block.timestamp
    lottery.number = event.params.num
    lottery.winner = event.params.user
    lottery.bank = event.params.bank
    lottery.save()

    // set future lottery bank to 0
    // clear array of participants
    // delete all LotteryParticipant entities
    let futureLottery = schema.FutureLottery.load('future-lottery')
    if (futureLottery) {
        futureLottery.bank = BigInt.zero()
        futureLottery.participantIds = []
        let users = futureLottery.participantIds
        for (let i = 0; i < users.length; i++) {
            let user = schema.LotteryParticipant.load(users[i])
            if (user) {
                user.contributed = BigInt.zero()
                user.save()
            }
        }

        futureLottery.save()
    }
}

