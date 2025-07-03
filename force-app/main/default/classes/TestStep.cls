public class TestStep {
    @AuraEnabled public String id;
    @AuraEnabled public String text;
    @AuraEnabled public Integer orderIndex;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    
    public TestStep() {
        this.id = generateId();
    }
    
    public TestStep(String text) {
        this();
        this.text = text;
    }
    
    public TestStep(String text, Integer orderIndex) {
        this(text);
        this.orderIndex = orderIndex;
    }
    
    private String generateId() {
        return EncodingUtil.convertToHex(Crypto.generateAESKey(128)).substring(0, 18);
    }
} 