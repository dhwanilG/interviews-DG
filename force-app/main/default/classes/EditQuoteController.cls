public with sharing class EditQuoteController {
    public EditQuoteController() {

    }

    @AuraEnabled
    public static QuoteDto getQuoteDetails(Id recordId){
        try {
            Quote__c quoteObj = [select id,Name,Start_date__c, EndDate__c from Quote__c where id = :recordId];
            QuoteDto objDto = new QuoteDto(quoteObj);
            return objDto;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveQuote(QuoteDto objDto){
        try {
            system.debug('objDto'+objDto);
            Quote__c quoteObj = new Quote__c();
            quoteObj.Id = objDto.id;
            quoteObj.Start_date__c = objDto.startDate;
            quoteObj.EndDate__c = objDto.endDate;
            update quoteObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}