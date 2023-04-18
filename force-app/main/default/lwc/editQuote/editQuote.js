/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import getQuoteData from '@salesforce/apex/QuoteData.getQuoteData';
import saveQuoteData from '@salesforce/apex/QuoteData.saveQuoteData';

export default class EditQuote extends LightningElement {
  @api recordId;
  
  @track quoteData = {
    name: "Quote Name",
    endDate: 1547250828000,
    startDate : 1547250828000
  };

  renderedCallback() {}

  connectedCallback()
  {
    getQuoteData({
      recordId : this.recordId
    })
    .then(result =>{
      if(result)
      {
        this.quoteData.id = result.id;
        this.quoteData.name = result.name;
        this.quoteData.endDate = result.endDate;
        this.quoteData.startDate = result.startDate;
      }
    })
  }

  handleChangeData(event)
  {
    this.quoteData[event.target.name] = event.target.value;
  }

  handleSaveData()
  {
    saveQuoteData({
      DtoObj : this.quoteData
    })
    .then(result =>{
       alert('Data Updated');
    })
  }
}