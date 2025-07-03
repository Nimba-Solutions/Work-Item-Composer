public class WorkItem {
    @AuraEnabled public String id;
    @AuraEnabled public String name;
    @AuraEnabled public String description;
    @AuraEnabled public String workType;
    @AuraEnabled public String status;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    @AuraEnabled public List<TestCase> testCases;
    
    public WorkItem() {
        this.testCases = new List<TestCase>();
    }
    
    public WorkItem(String id, String name, String description, String workType) {
        this();
        this.id = id;
        this.name = name;
        this.description = description;
        this.workType = workType;
        this.status = 'Draft';
    }
} 