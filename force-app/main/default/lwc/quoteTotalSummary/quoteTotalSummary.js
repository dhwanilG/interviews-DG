/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, track ,api } from 'lwc';
import getQuoteData from '@salesforce/apex/QuoteData.getQuoteData';
import saveAdjustedAmt from '@salesforce/apex/QuoteData.saveAdjustedAmt';

export default class QuoteComponent extends LightningElement {
    @api recordId;
    @track adjustedAmount
    
    showModal = false;

    connectedCallback()
    {
      getQuoteData({
        recordId : this.recordId
      })
      .then(result =>{
        if(result)
        {
          this.adjustedAmount = result.adjustedAmount;
        }
      })
    }

    handleAdjustQuote() {
        this.showModal = true;
    }

    handleAdjustedAmountChange(event) {
        this.adjustedAmount = event.target.value;
    }

    handleSave()
    {
        console.log("recordID",this.recordId);
        console.log("adjusted amt", this.adjustedAmount);
        saveAdjustedAmt({
        recordId:this.recordId,
        adjustedAmount:this.adjustedAmount
        })
        .then(result =>{
            this.showModal = false;
        })
    }

    handleCancel() {
        this.showModal = false;
    }
}

