/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */
import { LightningElement, api,track,wire } from 'lwc';
import getQuoteDetails from '@salesforce/apex/QuoteDto.getQuoteDetails';
import saveQuoteDetails from '@salesforce/apex/QuoteDto.saveQuoteDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EditQuote extends LightningElement {
  @api recordId;
  @track startDate;
  @track endDate;
  error;
  @track quoteData = {
    name: "Quote Name",
    endDate: "2020-09-07"
  };

  handleClick(){
    let objData = {
      id : this.recordId,
      endDate : this.endDate,
      startDate : this.startDate
    }
    saveQuoteDetails({
      QuoteData : objData
    }).then(result => {
      this.quoteData=JSON.parse(JSON.stringify(this.quoteData));
      this.quoteData.endDate = result.endDate;
      this.showSuccessToast();
  })
  .catch(error => {
      this.error = error;
  });
  }

  showSuccessToast() {
    const evt = new ShowToastEvent({
        title: 'Toast Success',
        message: 'Date saved sucessful',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
}


  handleChange(event){
    if(event.target.name=='EndDate'){
      this.endDate = event.target.value;
    }
    else if(event.target.name=='StartDate'){
      this.startDate = event.target.value;
    }
  }

  @wire(getQuoteDetails , { quoteRecordId: '$recordId'})
    wiredRecordsMethod({ error, data }) {
     
     
        if (data) {
            this.quoteData  = data;
      
            this.startDate = data.startDate;
            this.endDate = data.endDate;
            this.error = undefined;
            if(data.qtAmt!==null && data.qtAmt!==undefined){
              const selectEvent = new CustomEvent('qtamtfound', {
                detail: data.qtAmt
                });
                this.dispatchEvent(selectEvent);
            }
        } else if (error) {
          console.log('error=',JSON.stringify(error));
            this.error = error;
            this.quoteData  = undefined;
        }
    }
}