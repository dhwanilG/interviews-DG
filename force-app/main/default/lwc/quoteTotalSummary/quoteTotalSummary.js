/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    @api qtamt=0;
    showModalComponent=false;

    openModal(){
        this.showModalComponent=true
    }

    closeModal(){
        console.log('Closing MODAL');
        this.showModalComponent=false
    }
}