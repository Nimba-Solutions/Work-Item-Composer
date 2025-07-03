import { LightningElement, api, track } from 'lwc';
import createTestExecution from '@salesforce/apex/TestCaseController.createTestExecution';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestExecution extends LightningElement {
    @api testCase = {};
    @track outcomes = [];
    @track loading = false;

    connectedCallback() {
        // Initialize outcomes from expected outcomes
        this.outcomes = this.testCase.expectedOutcomes?.map(outcome => ({
            id: outcome.id,
            text: outcome.text,
            passed: false
        })) || [];
    }

    handleToggleOutcome(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        const passed = event.target.checked;
        this.outcomes[index] = { ...this.outcomes[index], passed };
        this.outcomes = [...this.outcomes];
    }

    async handleSave() {
        try {
            this.loading = true;
            
            // Convert outcomes to TestOutcome objects for Apex
            const testOutcomes = this.outcomes.map(outcome => ({
                text: outcome.text,
                passed: outcome.passed
            }));
            
            await createTestExecution({
                testCaseId: this.testCase.id,
                outcomes: testOutcomes
            });
            
            this.showToast('Success', 'Test execution saved successfully', 'success');
            this.dispatchEvent(new CustomEvent('back'));
        } catch (error) {
            this.showToast('Error', 'Failed to save test execution', 'error');
        } finally {
            this.loading = false;
        }
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
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

    get hasSteps() {
        return this.testCase.steps && this.testCase.steps.length > 0;
    }

    get hasOutcomes() {
        return this.outcomes && this.outcomes.length > 0;
    }

    get allOutcomesPassed() {
        return this.outcomes.every(outcome => outcome.passed === true);
    }

    get anyOutcomesFailed() {
        return this.outcomes.some(outcome => outcome.passed === false);
    }

    get inProgress() {
        return !this.allOutcomesPassed && !this.anyOutcomesFailed;
    }

    get executionStatus() {
        if (this.allOutcomesPassed) return 'success';
        if (this.anyOutcomesFailed) return 'error';
        return 'neutral';
    }
} 