public with sharing class QuoteDto extends BaseDto {
   
  public QuoteDto() {
    sObj = new Quote__c();
  }

  public QuoteDto(Quote__c quote) {
    super(quote);    
  }

  @AuraEnabled
  public static void updateQuote(String id,Date startDate,Date endDate,Decimal qtyAmnt) {
    Quote__c quote = new Quote__c(Id = id);
    if(startDate != null)
      quote.StartDate__c = startDate;
    if(endDate != null)
      quote.EndDate__c = endDate;        
    if(qtyAmnt != null)
      quote.TotalQuotedAmount__c = qtyAmnt;        
    QuoteDto dto = new QuoteDto(quote);
    dto.operationType = BaseDto.OPERATION_TYPE_UPDATE;
    dto.save();
  }

  public override SObject refreshSo() {
    sObj = [SELECT Id, StartDate__c, EndDate__c,TotalQuotedAmount__c FROM Quote__c WHERE Id = :id];
    return sObj;
  }
}
