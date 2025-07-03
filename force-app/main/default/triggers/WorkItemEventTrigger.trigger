trigger WorkItemEventTrigger on Work_Item_Event__e (after insert) {
    WorkItemService.processEvents(Trigger.new);
} 