public class ExpectedOutcome {
    @AuraEnabled public String id;
    @AuraEnabled public String text;
    @AuraEnabled public Integer orderIndex;
    @AuraEnabled public DateTime createdDate;
    @AuraEnabled public DateTime lastModifiedDate;
    
    public ExpectedOutcome() {
        this.id = generateId();
    }
    
    public ExpectedOutcome(String text) {
        this();
        this.text = text;
    }
    
    public ExpectedOutcome(String text, Integer orderIndex) {
        this(text);
        this.orderIndex = orderIndex;
    }
    
    private String generateId() {
        return EncodingUtil.convertToHex(Crypto.generateAESKey(128)).substring(0, 18);
    }
} 