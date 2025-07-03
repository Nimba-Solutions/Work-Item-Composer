public class TestCase {
    @AuraEnabled public String id;
    @AuraEnabled public String name;
    @AuraEnabled public String acceptanceCriteria;
    @AuraEnabled public List<TestStep> steps;
    @AuraEnabled public List<ExpectedOutcome> expectedOutcomes;
    @AuraEnabled public Integer orderIndex;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    
    public TestCase() {
        this.steps = new List<TestStep>();
        this.expectedOutcomes = new List<ExpectedOutcome>();
    }
    
    public TestCase(String id, String name, String acceptanceCriteria) {
        this();
        this.id = id;
        this.name = name;
        this.acceptanceCriteria = acceptanceCriteria;
    }
    
    public TestCase(String id, String name, String acceptanceCriteria, List<TestStep> steps, List<ExpectedOutcome> expectedOutcomes) {
        this(id, name, acceptanceCriteria);
        this.steps = steps != null ? steps : new List<TestStep>();
        this.expectedOutcomes = expectedOutcomes != null ? expectedOutcomes : new List<ExpectedOutcome>();
    }
} 