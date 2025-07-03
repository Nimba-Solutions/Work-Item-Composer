public with sharing class WorkItemEventPublisher {
    @AuraEnabled
    public static void publishWorkItemEvent(String operation, String body) {
        Work_Item_Event__e event = new Work_Item_Event__e(
            Operation__c = operation,
            Body__c = body
        );
        EventBus.publish(event);
    }
} 