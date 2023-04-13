/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api,wire } from "lwc";
import { getRecord } from 'lightning/uiRecordApi';

export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    @api qtamt=0;
    showModalComponent=false;

    @wire(getRecord, { recordId: '$recordId'}) recordId;

    connectedCallback() {
        console.log('connected===============');
        console.log(JSON.stringify(this.recordId) + ' is null');
    }

    renderedCallback() {
        console.log('rendered------------');
        console.log(JSON.stringify(this.recordId) + ' is provided');
    }

    openModal(){
        this.showModalComponent=true
    }

    closeModal(){
        console.log('Closing MODAL');
        this.showModalComponent=false
    }
}