import { LightningElement, track } from 'lwc';
import publishWorkItemEvent from '@salesforce/apex/WorkItemEventPublisher.publishWorkItemEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const PRIORITIES = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
];
const TYPES = [
    { label: 'Feature', value: 'Feature' },
    { label: 'Fix', value: 'Fix' },
    { label: 'Task', value: 'Task' }
];

export default class WorkItemComposer extends LightningElement {
    @track description = '';
    @track priority = 'Medium';
    @track type = 'Feature';
    @track testCases = [];

    get priorities() {
        return PRIORITIES;
    }
    get types() {
        return TYPES;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }
    handlePriorityChange(event) {
        this.priority = event.detail.value;
    }
    handleTypeChange(event) {
        this.type = event.detail.value;
    }
    handleTestCasesChange(event) {
        this.testCases = event.detail;
    }
    async handleSaveWorkItem() {
        const workItem = {
            description: this.description,
            priority: this.priority,
            type: this.type,
            testCases: this.testCases
        };
        try {
            await publishWorkItemEvent({
                operation: 'create',
                body: JSON.stringify(workItem)
            });
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Work item submitted!',
                variant: 'success'
            }));
            this.dispatchEvent(new CustomEvent('close'));
        } catch (e) {
            // Optionally handle error
        }
    }
}