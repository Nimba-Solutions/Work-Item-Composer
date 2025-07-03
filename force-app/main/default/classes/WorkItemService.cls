public class WorkItemService {
    
    public static void processEvents(List<Work_Item_Event__e> events) {
        for (Work_Item_Event__e event : events) {
            try {
                processEvent(event);
            } catch (Exception e) {
                System.debug('Error processing Work Item Event: ' + e.getMessage());
            }
        }
    }
    
    private static void processEvent(Work_Item_Event__e event) {
        String operation = event.Operation__c;
        String body = event.Body__c;
        
        if (String.isBlank(body)) {
            System.debug('Event body is empty for operation: ' + operation);
            return;
        }
        
        if (operation == 'CREATE_WORK_ITEM') {
            processCreateWorkItem(body);
        } else if (operation == 'UPDATE_WORK_ITEM') {
            processUpdateWorkItem(body);
        } else if (operation == 'DELETE_WORK_ITEM') {
            processDeleteWorkItem(body);
        } else if (operation == 'CREATE_TEST_CASE') {
            processCreateTestCase(body);
        } else if (operation == 'UPDATE_TEST_CASE') {
            processUpdateTestCase(body);
        } else if (operation == 'DELETE_TEST_CASE') {
            processDeleteTestCase(body);
        } else if (operation == 'CREATE_TEST_EXECUTION') {
            processCreateTestExecution(body);
        } else if (operation == 'UPDATE_TEST_EXECUTION') {
            processUpdateTestExecution(body);
        } else {
            System.debug('Unknown operation: ' + operation);
        }
    }
    
    private static void processCreateWorkItem(String body) {
        try {
            WorkItem workItem = (WorkItem) JSON.deserialize(body, WorkItem.class);
            System.debug('Processing CREATE_WORK_ITEM: ' + workItem.name);
        } catch (Exception e) {
            System.debug('Error deserializing WorkItem: ' + e.getMessage());
        }
    }
    
    private static void processUpdateWorkItem(String body) {
        try {
            WorkItem workItem = (WorkItem) JSON.deserialize(body, WorkItem.class);
            System.debug('Processing UPDATE_WORK_ITEM: ' + workItem.name);
        } catch (Exception e) {
            System.debug('Error deserializing WorkItem: ' + e.getMessage());
        }
    }
    
    private static void processDeleteWorkItem(String body) {
        try {
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(body);
            String workItemId = (String) data.get('id');
            System.debug('Processing DELETE_WORK_ITEM: ' + workItemId);
        } catch (Exception e) {
            System.debug('Error processing DELETE_WORK_ITEM: ' + e.getMessage());
        }
    }
    
    private static void processCreateTestCase(String body) {
        try {
            TestCase testCase = (TestCase) JSON.deserialize(body, TestCase.class);
            System.debug('Processing CREATE_TEST_CASE: ' + testCase.name);
        } catch (Exception e) {
            System.debug('Error deserializing TestCase: ' + e.getMessage());
        }
    }
    
    private static void processUpdateTestCase(String body) {
        try {
            TestCase testCase = (TestCase) JSON.deserialize(body, TestCase.class);
            System.debug('Processing UPDATE_TEST_CASE: ' + testCase.name);
        } catch (Exception e) {
            System.debug('Error deserializing TestCase: ' + e.getMessage());
        }
    }
    
    private static void processDeleteTestCase(String body) {
        try {
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(body);
            String testCaseId = (String) data.get('id');
            System.debug('Processing DELETE_TEST_CASE: ' + testCaseId);
        } catch (Exception e) {
            System.debug('Error processing DELETE_TEST_CASE: ' + e.getMessage());
        }
    }
    
    private static void processCreateTestExecution(String body) {
        try {
            TestExecution testExecution = (TestExecution) JSON.deserialize(body, TestExecution.class);
            System.debug('Processing CREATE_TEST_EXECUTION: ' + testExecution.name);
        } catch (Exception e) {
            System.debug('Error deserializing TestExecution: ' + e.getMessage());
        }
    }
    
    private static void processUpdateTestExecution(String body) {
        try {
            TestExecution testExecution = (TestExecution) JSON.deserialize(body, TestExecution.class);
            System.debug('Processing UPDATE_TEST_EXECUTION: ' + testExecution.name);
        } catch (Exception e) {
            System.debug('Error deserializing TestExecution: ' + e.getMessage());
        }
    }
} 