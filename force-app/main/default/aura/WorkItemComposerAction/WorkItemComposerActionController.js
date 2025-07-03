({
    doInit : function(component, event, helper) {
        component.set("v.isOpen", true);
    },
    handleClose : function(component, event, helper) {
        component.set("v.isOpen", false);
        $A.get("e.force:closeQuickAction").fire();
    }
}) 