import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import * as schema from '../../generated/schema'


export function handleFutureLottery(
    contribution: BigInt,
    linksAmount: BigInt,
    user: Bytes,
): void {

    // get future lottery instance
    let lottery = schema.FutureLottery.load('future-lottery')

    // increase lottery bank and add user as participant
    if (lottery == null
    ) {
        lottery = new schema.FutureLottery('future-lottery')
        lottery.bank = contribution
        lottery.linksBank = linksAmount
        lottery.participantIds = [user]
    } else {
        lottery.bank = lottery.bank.plus(contribution)
        lottery.linksBank = lottery.linksBank.plus(linksAmount)
        let pIDs = lottery.participantIds
        pIDs.push(user)
        lottery.participantIds = pIDs
    }
    lottery.save()
}