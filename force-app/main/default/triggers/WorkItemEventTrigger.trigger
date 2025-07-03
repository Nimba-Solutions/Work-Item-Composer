trigger WorkItemEventTrigger on Work_Item_Event__e (after insert) {
    System.debug('WorkItemEventTrigger invoked with ' + Trigger.new.size() + ' events');
    WorkItemService.processEvents(Trigger.new);
} 