/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { api } from "lwc";
import LightningModal from 'lightning/modal';
export default class AdjustQuotePrice extends LightningModal {
  adjustedAmountLabel = "Adjusted Amount";
  @api adjustedAmount;
  handleFieldChange(event){
    this.adjustedAmount = event.target.value;
  }
  handleOkay(){
    if(this.adjustedAmount && this.adjustedAmount!=null && this.adjustedAmount>=0 ||this.adjustedAmount<0)
      this.close({amount:this.adjustedAmount}); 
    else
      alert('Adjusted Amount is required.');
  }
}
