/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,track, api, wire } from "lwc";
import { getRecord, updateRecord } from "lightning/uiRecordApi";
import ENDDATE from "@salesforce/schema/Quote__c.EndDate__c";
import STARTDATE from "@salesforce/schema/Quote__c.StartDate__c";
import NAME from "@salesforce/schema/Quote__c.Name";
import TOTALQUOTEAMOUNT from "@salesforce/schema/Quote__c.TotalQuotedAmount__c";
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData={};    
  
  @wire(getRecord,{recordId:'$recordId',fields:[NAME,TOTALQUOTEAMOUNT,STARTDATE,ENDDATE]})
  currentRecord({error , data}){
    if(data){      
      this.quoteData.name = data.fields.Name.value;
      this.quoteData.endDate = data.fields.EndDate__c.value;
      this.quoteData.startDate = data.fields.StartDate__c.value;
      if(data.fields.TotalQuotedAmount__c){
        const event = new CustomEvent('quoteamnt', {
            detail: data.fields.TotalQuotedAmount__c.value
        });
        this.dispatchEvent(event);
      }
    }else{
      console.log(error);
    }
  }
  handleStartDateChange(event){
    this.quoteData.startDate = event.target.value;
  }
  handleEndDateChange(event){
    this.quoteData.endDate = event.target.value;
  }
  handleSave(){
    
    updateQuote({id:this.recordId,startDate:this.quoteData.startDate,endDate:this.quoteData.endDate})
            .then(() => {
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
  renderedCallback() {}
}
