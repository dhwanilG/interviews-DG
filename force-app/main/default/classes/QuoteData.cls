public with sharing class QuoteData {
    public QuoteData() {

    }

    @AuraEnabled
    public static QuoteDto getQuoteData(Id recordId){
        QuoteDto DtoObj;
        try {
            Quote__c quoteObj = [SELECT Id, Name, StartDate__c, EndDate__c, Adjusted_Amount__c FROM Quote__c WHERE Id = :recordId];
            DtoObj = new QuoteDto(quoteObj);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return DtoObj;
    }

    @AuraEnabled
    public static void saveQuoteData(QuoteDto DtoObj){
        try {
            system.debug('DtoObj'+DtoObj);
            Quote__c quoteObj = new Quote__c();
            quoteObj.Id = DtoObj.id;
            quoteObj.StartDate__c = DtoObj.startDate;
            quoteObj.EndDate__c = DtoObj.endDate;
            update quoteObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveAdjustedAmt(Id recordId, Integer adjustedAmount){
        try {
            system.debug('recordId'+recordId);
            system.debug('adjustedAmount'+adjustedAmount);
            
            Quote__c quoteObj = new Quote__c();
            quoteObj.id = recordId;
            quoteObj.Adjusted_Amount__c = adjustedAmount;
            update quoteObj;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}