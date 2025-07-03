import { LightningElement, api, track } from 'lwc';

export default class TestHistory extends LightningElement {
    @api testCaseId;
    @track executions = [];
    @track loading = true;
    @track error;

    connectedCallback() {
        this.loading = false;
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    get hasExecutions() {
        return this.executions && this.executions.length > 0;
    }

    get executionCount() {
        return this.executions.length;
    }

    get latestExecution() {
        if (this.executions.length === 0) return null;
        return this.executions[this.executions.length - 1];
    }

    get latestExecutionStatus() {
        if (!this.latestExecution) return 'neutral';
        const outcomes = this.latestExecution.outcomes;
        if (outcomes.every(o => o.passed)) return 'success';
        if (outcomes.some(o => o.passed === false)) return 'error';
        return 'neutral';
    }
} 