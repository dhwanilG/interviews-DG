public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate{ get; set; }

  @AuraEnabled
  public Date startDate{ get; set; }

  @AuraEnabled
  public String name{ get; set; }

  @AuraEnabled
  public Decimal qtAmt{ get; set; }

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.name= quote.Name;
    this.endDate = quote.EndDate__c;
    this.startDate = quote.Start_Date__c;
    this.qtAmt = quote.TotalQuotedAmount__c;
    
  }


  public override SObject refreshSo() {
    return null;
  }

  @AuraEnabled(Cacheable=true)
  public static QuoteDto getQuoteDetails(id quoteRecordId){
    QuoteDto instanceQuoteDto ;
    List<Quote__c> lstQuotes = new List<Quote__c>();
    try {
      lstQuotes=[Select id,Name, Start_Date__c,EndDate__c,TotalQuotedAmount__c from Quote__c where ID = :quoteRecordId];
      if(!lstQuotes.isEmpty()){
        instanceQuoteDto = new QuoteDto(lstQuotes[0]);
        system.debug(instanceQuoteDto);
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
      
    }
    system.debug(instanceQuoteDto);
    return instanceQuoteDto;
  }

  @AuraEnabled
  public static QuoteDto saveQuoteDetails(QuoteDto QuoteData){
    QuoteDto instanceQuoteDto ;
    system.debug('QuoteData='+QuoteData);
   // List<Quote__c> lstQuotes = new List<Quote__c>();
    Quote__c ObjQuote = new Quote__c(
      id=QuoteData.id
    );

    if(QuoteData.startDate!=null){
      ObjQuote.Start_Date__c = QuoteData.startDate;
    }
    if(QuoteData.endDate!=null){
      ObjQuote.EndDate__c = QuoteData.endDate;
    }
    if(QuoteData.qtAmt!=null){
      ObjQuote.TotalQuotedAmount__c = QuoteData.qtAmt;
    }

    try {
        update ObjQuote;
        instanceQuoteDto = new QuoteDto(ObjQuote);
        system.debug(instanceQuoteDto);
     
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
      
    }
    system.debug(instanceQuoteDto);
    return instanceQuoteDto;
  }

}