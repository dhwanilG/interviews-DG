/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import getQuoteDetails from '@salesforce/apex/EditQuoteController.getQuoteDetails';
import saveQuote from '@salesforce/apex/EditQuoteController.saveQuote';

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
    debugger;
    getQuoteDetails({
      recordId : this.recordId
    })
    .then(result =>{
      if(result)
      {
        this.quoteData.id = result.id;
        this.quoteData.name = result.name;
        this.quoteData.endDate = result.endDate;
        this.quoteData.startDate = result.startDate;
        debugger;
      }
    })
  }

  handleFieldChange(event)
  {
    this.quoteData[event.target.name] = event.target.value;
  }

  handleSave()
  {
    debugger;
    saveQuote({
      objDto : this.quoteData
    })
    .then(result =>{
       alert('Data Updated');
    })
    objDto
  }
}
