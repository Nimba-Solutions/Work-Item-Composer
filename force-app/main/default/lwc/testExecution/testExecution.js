import { LightningElement, api, track } from 'lwc';
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

    handleSave() {
        // TODO: Implement save functionality when new controller is available
        this.showToast('Info', 'Save functionality not yet implemented', 'info');
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