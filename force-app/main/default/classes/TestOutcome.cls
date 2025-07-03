public class TestOutcome {
    @AuraEnabled public String id;
    @AuraEnabled public String text;
    @AuraEnabled public Boolean passed;
    @AuraEnabled public String notes;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    
    public TestOutcome() {
        this.id = generateId();
    }
    
    public TestOutcome(String text) {
        this();
        this.text = text;
    }
    
    public TestOutcome(String text, Boolean passed) {
        this(text);
        this.passed = passed;
    }
    
    public TestOutcome(String text, Boolean passed, String notes) {
        this(text, passed);
        this.notes = notes;
    }
    
    private String generateId() {
        return EncodingUtil.convertToHex(Crypto.generateAESKey(128)).substring(0, 18);
    }
} 