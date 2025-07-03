import { LightningElement, api, track } from 'lwc';

export default class TestCaseEditor extends LightningElement {
    @api testCase = null;
    @track acceptanceCriteria = '';
    @track steps = [];
    @track expectedOutcomes = [];
    @api workType;
    @track observedOutcome = '';

    connectedCallback() {
        if (this.testCase) {
            // Editing existing test case
            this.acceptanceCriteria = this.testCase.acceptanceCriteria || '';
            this.steps = [...(this.testCase.steps || [])].map((s) => ({ value: s.value !== undefined ? s.value : s }));
            this.expectedOutcomes = [...(this.testCase.expectedOutcomes || [])];
            this.observedOutcome = this.testCase.observedOutcome || '';
        } else {
            // Creating new test case
            this.acceptanceCriteria = '';
            this.steps = [
                { value: 'Log into Salesforce as a Standard User' },
                { value: 'Navigate to ⋮⋮⋮ > ...' },
                { value: '' }
            ];
            this.expectedOutcomes = [{ id: Date.now().toString(), text: '' }];
            this.observedOutcome = '';
        }
        this.updateStepButtonStates();
        this.updateOutcomeButtonStates();
    }

    handleAcceptanceCriteriaChange(event) {
        this.acceptanceCriteria = event.target.value;
    }

    handleStepChange(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        const value = event.target.value;
        this.steps[index].value = value;
        this.updateStepButtonStates();
    }

    handleAddStep() {
        this.steps.push({ value: '' });
        this.updateStepButtonStates();
    }

    handleDeleteStep(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        this.steps.splice(index, 1);
        this.updateStepButtonStates();
    }

    handleMoveStepUp(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        if (index > 0) {
            const temp = this.steps[index];
            this.steps[index] = this.steps[index - 1];
            this.steps[index - 1] = temp;
            this.updateStepButtonStates();
        }
    }

    handleMoveStepDown(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        if (index < this.steps.length - 1) {
            const temp = this.steps[index];
            this.steps[index] = this.steps[index + 1];
            this.steps[index + 1] = temp;
            this.updateStepButtonStates();
        }
    }

    handleExpectedOutcomeChange(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        const value = event.target.value;
        this.expectedOutcomes[index].text = value;
        this.updateOutcomeButtonStates();
    }

    handleAddExpectedOutcome() {
        this.expectedOutcomes.push({ id: Date.now().toString(), text: '' });
        this.updateOutcomeButtonStates();
    }

    handleDeleteExpectedOutcome(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        this.expectedOutcomes.splice(index, 1);
        this.updateOutcomeButtonStates();
    }

    handleMoveExpectedOutcomeUp(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        if (index > 0) {
            const temp = this.expectedOutcomes[index];
            this.expectedOutcomes[index] = this.expectedOutcomes[index - 1];
            this.expectedOutcomes[index - 1] = temp;
            this.updateOutcomeButtonStates();
        }
    }

    handleMoveExpectedOutcomeDown(event) {
        const index = parseInt(event.currentTarget.dataset.index);
        if (index < this.expectedOutcomes.length - 1) {
            const temp = this.expectedOutcomes[index];
            this.expectedOutcomes[index] = this.expectedOutcomes[index + 1];
            this.expectedOutcomes[index + 1] = temp;
            this.updateOutcomeButtonStates();
        }
    }

    handleObservedOutcomeChange(event) {
        this.observedOutcome = event.target.value;
    }

    handleSave() {
        // Validate required fields
        if (!this.acceptanceCriteria.trim()) {
            alert('Please enter acceptance criteria');
            return;
        }

        // Prepare data for parent
        const testCaseData = {
            acceptanceCriteria: this.acceptanceCriteria.trim(),
            steps: this.steps.filter(step => step.value.trim() !== '').map(step => step.value.trim()),
            expectedOutcomes: this.expectedOutcomes
                .filter(outcome => outcome.text.trim() !== '')
                .map(outcome => outcome.text.trim()),
            observedOutcome: this.isFixType ? this.observedOutcome : undefined
        };

        this.dispatchEvent(new CustomEvent('save', {
            detail: testCaseData
        }));
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    get hasSteps() {
        return this.steps && this.steps.length > 0;
    }

    get hasExpectedOutcomes() {
        return this.expectedOutcomes && this.expectedOutcomes.length > 0;
    }

    get isNewTestCase() {
        return !this.testCase;
    }

    isStepUpDisabled(index) {
        return index === 0;
    }
    isStepDownDisabled(index) {
        return index === this.steps.length - 1;
    }
    isOutcomeUpDisabled(index) {
        return index === 0;
    }
    isOutcomeDownDisabled(index) {
        return index === this.expectedOutcomes.length - 1;
    }

    updateStepButtonStates() {
        this.steps = this.steps.map((step, i, arr) => ({
            value: step.value,
            isUpDisabled: i === 0,
            isDownDisabled: i === arr.length - 1
        }));
    }
    updateOutcomeButtonStates() {
        this.expectedOutcomes = this.expectedOutcomes.map((outcome, i, arr) => ({
            ...outcome,
            isUpDisabled: i === 0,
            isDownDisabled: i === arr.length - 1
        }));
    }

    get isFixType() {
        return this.workType === 'Fix';
    }

    get activeSections() {
        return this.isFixType ? ['steps', 'expectedOutcomes', 'observedOutcomes'] : ['steps', 'expectedOutcomes'];
    }
}