public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate {get; set;}
  @AuraEnabled
  public Date startDate {get; set;}
  

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.Start_date__c;
    this.name = quote.name;
  }

  public override SObject refreshSo() {
    return null;
  }
}
