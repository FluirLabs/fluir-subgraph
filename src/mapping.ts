import { ethereum, BigInt, log ,Address, BigDecimal, bigInt, store} from "@graphprotocol/graph-ts";

import {
  CreateStream as CreateStreamEvent,
  TokenRegister as TokenRegisterEvent,
  CloseStream  as CloseStreamEvent,
  ExtendStream as ExtendStreamEvent,
  ResumeStream as ResumeStreamEvent,
  PauseStream as PauseStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
  SetNewRecipient as SetNewRecipientEvent
} from "../generated/Stream/Stream";

import { Stream, RegisteredTokenLog ,TokenRegister} from "../generated/schema";

import  { convertTokenToDecimal, fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "./utils/helpers"


function createEventID(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.logIndex.toString());
}

export  function  handleCreateStream(ev: CreateStreamEvent): void {
 
  //token entity
  let token = TokenRegister.load(ev.params.tokenAddress.toHex())!;
  if(!token){
    log.error("[handleCreateStream] Token Does Not Exists{}",[ev.params.tokenAddress.toHex()]);
  }


  //locd existing stream entity
  let stream = Stream.load(ev.params.streamId.toHex());
  if(stream) {
    log.error("[handleCreateStream] Stream already exists {}",[ev.params.streamId.toHex()])
  }

  //convert from bigInt to decimals values 
  // let streamDeposit = convertTokenToDecimal(ev.params.deposit, token.decimals)
 
  let streamDeposit = convertTokenToDecimal(ev.params.deposit, BigInt.fromI32(token.decimals));
  let streamCliffAmount = convertTokenToDecimal(ev.params.cliffAmount, BigInt.fromI32(token.decimals));

  //create a new stream
  stream = new Stream(ev.params.streamId.toHex());
  stream.deposit = streamDeposit;
  stream.cliffAmount = streamCliffAmount;
  stream.cliffTime = ev.params.cliffTime;
  stream.startTime = ev.params.startTime;
  stream.stopTime = ev.params.stopTime;
  stream.interval  = ev.params.interval;
  stream.autoWithdraw = ev.params.autoWithdraw;
  stream.autoWithdrawInterval = ev.params.autoWithdrawInterval;


  //stream ratePerInterval  Calculation
  // formula: deposit / ((stopTime - startTime) / interval)

  stream.ratePerInterval = convertTokenToDecimal(ev.params.deposit.div(ev.params.stopTime.minus(ev.params.startTime).div(ev.params.interval)),
  BigInt.fromI32(token.decimals)
)

stream.remainingBalance = streamDeposit;
stream.createAt = ev.block.timestamp;
stream.pauseAt = BigInt.fromI32(0);



stream.save;

}



export  function  handleTokenRegister(ev: TokenRegisterEvent):void{
  let token = new RegisteredTokenLog(createEventID(ev));
}


export function handleExtend(ev:ExtendStreamEvent):void{

}



export function handleWithdraw(ev:WithdrawFromStreamEvent):void{
}


export function handleClose(ev:CloseStreamEvent):void{

}

export function handlePause(ev:PauseStreamEvent):void{
}

export function handleResume(ev:ResumeStreamEvent):void{


}

export function handleSetNewRecipient(ev:SetNewRecipientEvent):void{
  
}

