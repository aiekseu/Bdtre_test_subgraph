import { Contributed, Lottery, Offset } from '../generated/Bidtree/Bidtree'
import * as schema from '../generated/schema'
import { Address, BigInt } from '@graphprotocol/graph-ts'


const zeroAddress = '0x0000000000000000000000000000000000000000'
// note: objects don't exist here
// formula doesn't work either
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

    let contribute = new schema.Contribution(event.transaction.hash)
    contribute.timestamp = event.block.timestamp
    contribute.user = event.params.user
    contribute.referralAddress = event.params.refadr
    contribute.amount = event.params.amount
    contribute.links = links as BigInt
    contribute.linksLeft = links as BigInt
    contribute.toReferral = event.params.referral
    contribute.toFund = event.params.fund
    contribute.toLottery = event.params.lottery
    contribute.toMarketing = event.params.marketing
    contribute.toOwner = event.params.toOwner
    contribute.discount = event.params.refund
    contribute.contributor = event.params.user
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
        user.bidsIds = [event.transaction.hash]
        user.save()
    } else {
        user.contributedToCurrentLottery = event.params.lottery.plus(user.contributedToCurrentLottery)
        user.contributed = user.contributed.plus(event.params.amount)
        user.actualContributed = user.actualContributed.plus(actualContributed)
        user.openLinks = user.openLinks.plus(links)
        user.linksCreated = user.linksCreated.plus(links)

        let usersBids = user.bidsIds
        usersBids.push(event.transaction.hash)
        user.bidsIds = usersBids
        user.save()
    }

    // get referral if exists
    if (event.params.refadr !== Address.fromString(zeroAddress)) {
        let referral = schema.User.load(event.params.refadr)
        // if there is referral
        if (referral !== null) {
            // increase earnings and decrease openLinks
            referral.openLinks = referral.openLinks.minus(BigInt.fromI32(1))
            referral.earned = referral.earned.plus(event.params.referral)
            referral.save()

            // get referral bid
            let refBidsIds = referral.bidsIds
            for (let i = 0; i < refBidsIds.length; i++) {
                const bid = schema.Contribution.load(refBidsIds[i])
                if (bid !== null && bid.linksLeft > BigInt.zero()) {
                    bid.linksLeft = bid.linksLeft.minus(BigInt.fromI32(1))
                    bid.save()
                    return
                }
            }
        }
    }

    // increase KPIs
    let kpi = schema.KPI.load('kpi')
    if (kpi === null) {
        kpi = new schema.KPI('kpi')
        kpi.usersIds = [event.params.user]
        kpi.totalUsers = BigInt.fromI32(1)
        kpi.totalContributed = event.params.amount
        kpi.totalActualContributed = actualContributed
        kpi.totalEarned = event.params.referral
        kpi.totalLottery = event.params.lottery
        kpi.totalToOwner = event.params.toOwner
        kpi.totalToMarketing = event.params.marketing
        kpi.totalToFund = event.params.fund
        kpi.totalFromFund = BigInt.zero()
        kpi.totalRefunded = BigInt.zero()
        kpi.totalWon = BigInt.zero()
        kpi.save()
    } else {
        let userIds = kpi.usersIds
        if (userIds.indexOf(event.params.user) === -1) {
            userIds.push(event.params.user)
            kpi.usersIds = userIds
            kpi.totalUsers = kpi.totalUsers.plus(BigInt.fromI32(1))
        }

        kpi.totalContributed = kpi.totalContributed.plus(event.params.amount)
        kpi.totalActualContributed = kpi.totalActualContributed.plus(actualContributed)

        if (event.params.refadr !== Address.fromString(zeroAddress)) {
            kpi.totalEarned = kpi.totalEarned.plus(event.params.referral)
        }
        kpi.totalLottery = kpi.totalLottery.plus(event.params.lottery)
        kpi.totalToOwner = kpi.totalToOwner.plus(event.params.toOwner)
        kpi.totalToMarketing = kpi.totalToMarketing.plus(event.params.marketing)
        kpi.totalToFund = kpi.totalToFund.plus(event.params.fund)
        kpi.save()
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

    let kpi = schema.KPI.load('kpi')
    if (kpi !== null) {
        kpi.totalFromFund = kpi.totalFromFund.plus(event.params.price)
        kpi.totalRefunded = kpi.totalRefunded.plus(event.params.amount)
        kpi.save()
    }
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

    let kpi = schema.KPI.load('kpi')
    if (kpi !== null) {
        kpi.totalWon = kpi.totalWon.plus(event.params.bank)
        kpi.save()
    }
}

