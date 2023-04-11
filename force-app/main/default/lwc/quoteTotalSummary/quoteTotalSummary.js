/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api } from "lwc";
import AdjustQuotePriceModal from 'c/adjustQuotePrice';
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuoteTotalSummary extends LightningElement {
  @api recordId
  @api quoteAmnt
  handleClick(){
    this.openModal().then(res => {
      if(res){
        updateQuote({id:this.recordId,qtyAmnt:res.amount})
            .then(() => {
                this.quoteAmnt = res.amount;
                // Handle success
                this.dispatchEvent(new ShowToastEvent({
                  title: 'Successful!!',
                  message: 'Quote is Updated.',
                  variant: 'success'
              }));              
            })
            .catch(error => {
                // Handle error
                this.dispatchEvent(new ShowToastEvent({
                  title: 'Error!!',
                  message: 'Something went wrong. \n '+error,
                  variant: 'error'
              }));
            });
      }
    });
  }
  async openModal(){
    return await AdjustQuotePriceModal.open({
      size:'small',
      adjustedAmount:this.quoteAmnt
    });
  }
}
