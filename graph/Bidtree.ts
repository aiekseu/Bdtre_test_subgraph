import { dataSource, log } from '@graphprotocol/graph-ts';

import { Contributed, Offset, Lottery } from '../generated/Bidtree/Bidtree';
import { Contr, Off, Lotter } from '../generated/schema';


export function handleContributed(event: Contributed): void {
  let contribute = new Contr(event.transaction.hash.toHex())
  contribute.ts = event.block.timestamp
  contribute.user = event.params.user
  contribute.refadr = event.params.refadr
  contribute.amount = event.params.amount
  contribute.referral = event.params.referral
  contribute.fund = event.params.fund
  contribute.lottery = event.params.lottery
  contribute.marketing = event.params.marketing
  contribute.toOwner = event.params.toOwner
  contribute.refund = event.params.refund
  contribute.save();
}

export function handleOffset(event: Offset): void {
  let offset = new Off(event.transaction.hash.toHex())
  offset.ts = event.block.timestamp
  offset.user = event.params.user
  offset.number = event.params.number
  offset.amount = event.params.amount
  offset.price = event.params.price
  offset.save();
}

export function handleLottery(event: Lottery): void {
  let lottery = new Lotter(event.transaction.hash.toHex())
  lottery.ts = event.block.timestamp
  lottery.num = event.params.num
  lottery.user = event.params.user
  lottery.bank = event.params.bank
  lottery.save();
}

