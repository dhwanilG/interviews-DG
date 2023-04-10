/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api } from "lwc";
import saveQuoteDetails from '@salesforce/apex/QuoteDto.saveQuoteDetails';

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  @api adjustedAmount = 0;
  @api recordId;

  hideModalBox(){
    const selectEvent = new CustomEvent('closemodal');
      this.dispatchEvent(selectEvent);
      
  }

  handleChange(event){
    this.adjustedAmount=event.target.value;
  }
  handleClick(){
    let objData = {
      id : this.recordId,
      qtAmt : this.adjustedAmount
    }
    saveQuoteDetails({
      QuoteData : objData
    }).then(result => {
      this.adjustedAmount = result.qtAmt;
      this.hideModalBox();
  })
  .catch(error => {
      this.error = error;
  });
  }
}