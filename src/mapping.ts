import { ethereum, BigInt } from "@graphprotocol/graph-ts";

import {
  CreateStream as CreateStreamEvent,
  TokenRegister as TokenRegisterEvent,
} from "../generated/Stream/Stream";

import { Stream, RegisteredToken } from "../generated/schema";

function createEventID(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.logIndex.toString());
}

export function handleCreateStream(ev: CreateStreamEvent): void {
  let stream = new Stream(createEventID(ev));

  let params = ev.params;

  stream.streamId = params.streamId;
  stream.sender = params.sender.toHex();
  stream.recipient = params.recipient.toHex();
  stream.deposit = params.deposit;
  stream.tokenAddress = params.tokenAddress.toHex();
  stream.startTime = params.startTime;
  stream.stopTime = params.stopTime;
  stream.interval = params.interval;
  stream.cliffAmount = params.cliffAmount;
  stream.cliffTime = params.cliffTime;
  stream.autoWithdrawInterval = params.autoWithdrawInterval;
  stream.autoWithdraw = params.autoWithdraw;
  stream.pauseable = params.pauseable ? true : false;
  stream.closeable = params.closeable ? true : false;
  stream.recipientModifiable = params.recipientModifiable ? true : false;

  stream.save();
}

export function handleTokenRegister(ev: TokenRegisterEvent): void {
  let token = new RegisteredToken(createEventID(ev));

  let params = ev.params;

  token.feeRate = params.feeRate;
  token.tokenAddress = params.tokenAddress.toHex();

  token.save();
}
