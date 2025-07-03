public class TestExecution {
    @AuraEnabled public String id;
    @AuraEnabled public String name;
    @AuraEnabled public String testCaseId;
    @AuraEnabled public List<TestOutcome> outcomes;
    @AuraEnabled public DateTime executionDate;
    @AuraEnabled public String executedBy;
    @AuraEnabled public String status;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    
    public TestExecution() {
        this.outcomes = new List<TestOutcome>();
        this.executionDate = DateTime.now();
    }
    
    public TestExecution(String testCaseId) {
        this();
        this.testCaseId = testCaseId;
    }
    
    public TestExecution(String testCaseId, List<TestOutcome> outcomes) {
        this(testCaseId);
        this.outcomes = outcomes != null ? outcomes : new List<TestOutcome>();
    }
} 