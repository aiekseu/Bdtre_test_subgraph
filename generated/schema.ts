// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Contribution extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Contribution must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Contribution", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Contribution | null {
    return changetype<Contribution | null>(
      store.get("Contribution", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    return value!.toBytes();
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get contributor(): Bytes {
    let value = this.get("contributor");
    return value!.toBytes();
  }

  set contributor(value: Bytes) {
    this.set("contributor", Value.fromBytes(value));
  }

  get bidNum(): BigInt {
    let value = this.get("bidNum");
    return value!.toBigInt();
  }

  set bidNum(value: BigInt) {
    this.set("bidNum", Value.fromBigInt(value));
  }

  get referralAddress(): Bytes {
    let value = this.get("referralAddress");
    return value!.toBytes();
  }

  set referralAddress(value: Bytes) {
    this.set("referralAddress", Value.fromBytes(value));
  }

  get referralBidNum(): BigInt {
    let value = this.get("referralBidNum");
    return value!.toBigInt();
  }

  set referralBidNum(value: BigInt) {
    this.set("referralBidNum", Value.fromBigInt(value));
  }

  get cost(): BigInt {
    let value = this.get("cost");
    return value!.toBigInt();
  }

  set cost(value: BigInt) {
    this.set("cost", Value.fromBigInt(value));
  }

  get cashback(): BigInt {
    let value = this.get("cashback");
    return value!.toBigInt();
  }

  set cashback(value: BigInt) {
    this.set("cashback", Value.fromBigInt(value));
  }

  get actualCost(): BigInt {
    let value = this.get("actualCost");
    return value!.toBigInt();
  }

  set actualCost(value: BigInt) {
    this.set("actualCost", Value.fromBigInt(value));
  }

  get forSale(): boolean {
    let value = this.get("forSale");
    return value!.toBoolean();
  }

  set forSale(value: boolean) {
    this.set("forSale", Value.fromBoolean(value));
  }

  get links(): BigInt {
    let value = this.get("links");
    return value!.toBigInt();
  }

  set links(value: BigInt) {
    this.set("links", Value.fromBigInt(value));
  }

  get linksLeft(): BigInt {
    let value = this.get("linksLeft");
    return value!.toBigInt();
  }

  set linksLeft(value: BigInt) {
    this.set("linksLeft", Value.fromBigInt(value));
  }

  get toReferral(): BigInt {
    let value = this.get("toReferral");
    return value!.toBigInt();
  }

  set toReferral(value: BigInt) {
    this.set("toReferral", Value.fromBigInt(value));
  }

  get toLottery(): BigInt {
    let value = this.get("toLottery");
    return value!.toBigInt();
  }

  set toLottery(value: BigInt) {
    this.set("toLottery", Value.fromBigInt(value));
  }

  get toFund(): BigInt {
    let value = this.get("toFund");
    return value!.toBigInt();
  }

  set toFund(value: BigInt) {
    this.set("toFund", Value.fromBigInt(value));
  }

  get btcRate(): BigInt {
    let value = this.get("btcRate");
    return value!.toBigInt();
  }

  set btcRate(value: BigInt) {
    this.set("btcRate", Value.fromBigInt(value));
  }

  get refunded(): boolean {
    let value = this.get("refunded");
    return value!.toBoolean();
  }

  set refunded(value: boolean) {
    this.set("refunded", Value.fromBoolean(value));
  }

  get gifted(): boolean {
    let value = this.get("gifted");
    return value!.toBoolean();
  }

  set gifted(value: boolean) {
    this.set("gifted", Value.fromBoolean(value));
  }
}

export class Refund extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Refund entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Refund must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Refund", id.toString(), this);
    }
  }

  static load(id: string): Refund | null {
    return changetype<Refund | null>(store.get("Refund", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    return value!.toBytes();
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get bidNumber(): BigInt {
    let value = this.get("bidNumber");
    return value!.toBigInt();
  }

  set bidNumber(value: BigInt) {
    this.set("bidNumber", Value.fromBigInt(value));
  }

  get bidId(): Bytes {
    let value = this.get("bidId");
    return value!.toBytes();
  }

  set bidId(value: Bytes) {
    this.set("bidId", Value.fromBytes(value));
  }

  get amountRefunded(): BigInt {
    let value = this.get("amountRefunded");
    return value!.toBigInt();
  }

  set amountRefunded(value: BigInt) {
    this.set("amountRefunded", Value.fromBigInt(value));
  }

  get fromBank(): BigInt {
    let value = this.get("fromBank");
    return value!.toBigInt();
  }

  set fromBank(value: BigInt) {
    this.set("fromBank", Value.fromBigInt(value));
  }
}

export class Lottery extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Lottery entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Lottery must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Lottery", id.toString(), this);
    }
  }

  static load(id: string): Lottery | null {
    return changetype<Lottery | null>(store.get("Lottery", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get number(): BigInt {
    let value = this.get("number");
    return value!.toBigInt();
  }

  set number(value: BigInt) {
    this.set("number", Value.fromBigInt(value));
  }

  get winner(): Bytes {
    let value = this.get("winner");
    return value!.toBytes();
  }

  set winner(value: Bytes) {
    this.set("winner", Value.fromBytes(value));
  }

  get bank(): BigInt {
    let value = this.get("bank");
    return value!.toBigInt();
  }

  set bank(value: BigInt) {
    this.set("bank", Value.fromBigInt(value));
  }
}

export class FutureLottery extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FutureLottery entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FutureLottery must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FutureLottery", id.toString(), this);
    }
  }

  static load(id: string): FutureLottery | null {
    return changetype<FutureLottery | null>(store.get("FutureLottery", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get participants(): Array<Bytes> {
    let value = this.get("participants");
    return value!.toBytesArray();
  }

  set participants(value: Array<Bytes>) {
    this.set("participants", Value.fromBytesArray(value));
  }

  get participantIds(): Array<Bytes> {
    let value = this.get("participantIds");
    return value!.toBytesArray();
  }

  set participantIds(value: Array<Bytes>) {
    this.set("participantIds", Value.fromBytesArray(value));
  }

  get bank(): BigInt {
    let value = this.get("bank");
    return value!.toBigInt();
  }

  set bank(value: BigInt) {
    this.set("bank", Value.fromBigInt(value));
  }

  get linksBank(): BigInt {
    let value = this.get("linksBank");
    return value!.toBigInt();
  }

  set linksBank(value: BigInt) {
    this.set("linksBank", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type User must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): User | null {
    return changetype<User | null>(store.get("User", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get lottery(): string {
    let value = this.get("lottery");
    return value!.toString();
  }

  set lottery(value: string) {
    this.set("lottery", Value.fromString(value));
  }

  get contributedToCurrentLottery(): BigInt {
    let value = this.get("contributedToCurrentLottery");
    return value!.toBigInt();
  }

  set contributedToCurrentLottery(value: BigInt) {
    this.set("contributedToCurrentLottery", Value.fromBigInt(value));
  }

  get linksToCurrentLottery(): BigInt {
    let value = this.get("linksToCurrentLottery");
    return value!.toBigInt();
  }

  set linksToCurrentLottery(value: BigInt) {
    this.set("linksToCurrentLottery", Value.fromBigInt(value));
  }

  get contributed(): BigInt {
    let value = this.get("contributed");
    return value!.toBigInt();
  }

  set contributed(value: BigInt) {
    this.set("contributed", Value.fromBigInt(value));
  }

  get actualContributed(): BigInt {
    let value = this.get("actualContributed");
    return value!.toBigInt();
  }

  set actualContributed(value: BigInt) {
    this.set("actualContributed", Value.fromBigInt(value));
  }

  get earned(): BigInt {
    let value = this.get("earned");
    return value!.toBigInt();
  }

  set earned(value: BigInt) {
    this.set("earned", Value.fromBigInt(value));
  }

  get linksCreated(): BigInt {
    let value = this.get("linksCreated");
    return value!.toBigInt();
  }

  set linksCreated(value: BigInt) {
    this.set("linksCreated", Value.fromBigInt(value));
  }

  get openLinks(): BigInt {
    let value = this.get("openLinks");
    return value!.toBigInt();
  }

  set openLinks(value: BigInt) {
    this.set("openLinks", Value.fromBigInt(value));
  }

  get bids(): Array<Bytes> {
    let value = this.get("bids");
    return value!.toBytesArray();
  }

  set bids(value: Array<Bytes>) {
    this.set("bids", Value.fromBytesArray(value));
  }

  get bidsIds(): Array<Bytes> {
    let value = this.get("bidsIds");
    return value!.toBytesArray();
  }

  set bidsIds(value: Array<Bytes>) {
    this.set("bidsIds", Value.fromBytesArray(value));
  }
}

export class KPI extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save KPI entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type KPI must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("KPI", id.toString(), this);
    }
  }

  static load(id: string): KPI | null {
    return changetype<KPI | null>(store.get("KPI", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get usersIds(): Array<Bytes> {
    let value = this.get("usersIds");
    return value!.toBytesArray();
  }

  set usersIds(value: Array<Bytes>) {
    this.set("usersIds", Value.fromBytesArray(value));
  }

  get totalUsers(): BigInt {
    let value = this.get("totalUsers");
    return value!.toBigInt();
  }

  set totalUsers(value: BigInt) {
    this.set("totalUsers", Value.fromBigInt(value));
  }

  get totalContributed(): BigInt {
    let value = this.get("totalContributed");
    return value!.toBigInt();
  }

  set totalContributed(value: BigInt) {
    this.set("totalContributed", Value.fromBigInt(value));
  }

  get totalCashback(): BigInt {
    let value = this.get("totalCashback");
    return value!.toBigInt();
  }

  set totalCashback(value: BigInt) {
    this.set("totalCashback", Value.fromBigInt(value));
  }

  get totalActualContributed(): BigInt {
    let value = this.get("totalActualContributed");
    return value!.toBigInt();
  }

  set totalActualContributed(value: BigInt) {
    this.set("totalActualContributed", Value.fromBigInt(value));
  }

  get totalLinksCreated(): BigInt {
    let value = this.get("totalLinksCreated");
    return value!.toBigInt();
  }

  set totalLinksCreated(value: BigInt) {
    this.set("totalLinksCreated", Value.fromBigInt(value));
  }

  get totalEarned(): BigInt {
    let value = this.get("totalEarned");
    return value!.toBigInt();
  }

  set totalEarned(value: BigInt) {
    this.set("totalEarned", Value.fromBigInt(value));
  }

  get totalLottery(): BigInt {
    let value = this.get("totalLottery");
    return value!.toBigInt();
  }

  set totalLottery(value: BigInt) {
    this.set("totalLottery", Value.fromBigInt(value));
  }

  get totalWon(): BigInt {
    let value = this.get("totalWon");
    return value!.toBigInt();
  }

  set totalWon(value: BigInt) {
    this.set("totalWon", Value.fromBigInt(value));
  }

  get totalToFund(): BigInt {
    let value = this.get("totalToFund");
    return value!.toBigInt();
  }

  set totalToFund(value: BigInt) {
    this.set("totalToFund", Value.fromBigInt(value));
  }

  get totalFromFund(): BigInt {
    let value = this.get("totalFromFund");
    return value!.toBigInt();
  }

  set totalFromFund(value: BigInt) {
    this.set("totalFromFund", Value.fromBigInt(value));
  }

  get totalRefunded(): BigInt {
    let value = this.get("totalRefunded");
    return value!.toBigInt();
  }

  set totalRefunded(value: BigInt) {
    this.set("totalRefunded", Value.fromBigInt(value));
  }

  get totalDiscounts(): BigInt {
    let value = this.get("totalDiscounts");
    return value!.toBigInt();
  }

  set totalDiscounts(value: BigInt) {
    this.set("totalDiscounts", Value.fromBigInt(value));
  }

  get totalLinksGifted(): BigInt {
    let value = this.get("totalLinksGifted");
    return value!.toBigInt();
  }

  set totalLinksGifted(value: BigInt) {
    this.set("totalLinksGifted", Value.fromBigInt(value));
  }
}
