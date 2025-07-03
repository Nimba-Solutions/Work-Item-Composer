import { LightningElement, track, api, wire } from 'lwc';
import getTestCases from '@salesforce/apex/TestCaseController.getTestCases';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestCaseComposer extends LightningElement {
    @api workType;
    @track testCases = [];
    @track loading = true;
    @track error;

    @wire(getTestCases)
    wiredTestCases({ error, data }) {
        this.loading = false;
        if (data) {
            this.testCases = data;
        } else if (error) {
            this.error = error;
            this.showToast('Error', 'Failed to load test cases', 'error');
        }
    }

    handleTestCasesChange(event) {
        const updatedTestCases = event.detail;
        this.testCases = updatedTestCases;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}