import { Contributed, Lottery, Offset } from '../generated/Bidtree/Bidtree'
import * as schema from '../generated/schema'
import { Address, BigInt, log } from '@graphprotocol/graph-ts'

const zeroAddress = '0x0000000000000000000000000000000000000000'
// note: objects don't exist here
const calculateLinks = (cost: number): BigInt => {
    if (cost === 100) return BigInt.fromString('2')
    else if (cost === 300) return BigInt.fromString('4')
    else if (cost === 700) return BigInt.fromString('8')
    else if (cost === 1500) return BigInt.fromString('16')
    else if (cost === 3100) return BigInt.fromString('32')
    else if (cost === 6300) return BigInt.fromString('64')
    else if (cost === 12700) return BigInt.fromString('128')
    else if (cost === 25500) return BigInt.fromString('256')
    else if (cost === 51100) return BigInt.fromString('512')
    else if (cost === 102300) return BigInt.fromString('1024')
    else return BigInt.fromString('2')
}

const calculateActualContribution = (cost: number): BigInt => {
    if (cost === 100) return BigInt.fromString('100000000000000000000')
    else if (cost === 300) return BigInt.fromString('150000000000000000000')
    else if (cost === 700) return BigInt.fromString('250000000000000000000')
    else if (cost === 1500) return BigInt.fromString('450000000000000000000')
    else if (cost === 3100) return BigInt.fromString('850000000000000000000')
    else if (cost === 6300) return BigInt.fromString('1650000000000000000000')
    else if (cost === 12700) return BigInt.fromString('3250000000000000000000')
    else if (cost === 25500) return BigInt.fromString('6450000000000000000000')
    else if (cost === 51100) return BigInt.fromString('12850000000000000000000')
    else if (cost === 102300) return BigInt.fromString('25650000000000000000000')
    else return BigInt.fromString('100000000000000000000')
}

export function handleContributed(event: Contributed): void {
    const costInUsd = parseInt(event.params.amount.toString().slice(0, -18))
    const links = calculateLinks(costInUsd)

    let contribute = new schema.Contribution(event.transaction.hash.toHex())
    contribute.timestamp = event.block.timestamp
    contribute.user = event.params.user
    contribute.referralAddress = event.params.refadr
    contribute.amount = event.params.amount
    contribute.links = links
    contribute.toReferral = event.params.referral
    contribute.toFund = event.params.fund
    contribute.toLottery = event.params.lottery
    contribute.toMarketing = event.params.marketing
    contribute.toOwner = event.params.toOwner
    contribute.discount = event.params.refund
    contribute.save()

    // get future lottery instance
    let lottery = schema.FutureLottery.load('future-lottery')

    // increase lottery bank and add user as participant
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
    lottery.save()

    const actualContributed = calculateActualContribution(costInUsd)

    // add new user or incresase contributed if already participated
    let user = schema.User.load(event.params.user)
    if (user === null) {
        let user = new schema.User(event.params.user)

        // info about lottery
        user.address = event.params.user
        user.contributedToCurrentLottery = event.params.lottery
        user.lottery = 'future-lottery'

        // info about user
        user.contributed = event.params.amount
        user.actualContributed = actualContributed
        user.openLinks = links
        user.linksCreated = links
        user.earned = BigInt.zero()
        user.save()
    } else {
        user.contributedToCurrentLottery = event.params.lottery.plus(user.contributedToCurrentLottery)
        user.contributed = user.contributed.plus(event.params.amount)
        user.actualContributed = user.actualContributed.plus(actualContributed)
        user.openLinks = user.openLinks.plus(links)
        user.linksCreated = user.linksCreated.plus(links)
        user.save()
    }

    // decrease referral open links
    if (event.params.refadr !== Address.fromString(zeroAddress)) {
        let referral = schema.User.load(event.params.refadr)
        if (referral !== null) {
            referral.openLinks = referral.openLinks.minus(BigInt.fromI32(1))
            referral.earned = referral.earned.plus(event.params.referral)
            referral.save()
        }
    }
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
            let user = schema.User.load(users[i])
            if (user) {
                user.contributedToCurrentLottery = BigInt.zero()
                user.save()
            }
        }

        futureLottery.save()
    }
}

