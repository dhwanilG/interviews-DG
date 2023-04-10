/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class EditQuotePage extends LightningElement {
  @api recordId;
  quoteAmount=0;
  handleqtAmt(event){
    const qtAmt = event.detail;
        this.quoteAmount = qtAmt;
  }
}