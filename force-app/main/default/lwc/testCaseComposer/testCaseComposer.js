import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestCaseComposer extends LightningElement {
    @api workType;
    @track testCases = [];
    @track loading = true;
    @track error;

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