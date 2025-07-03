import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestCaseList extends LightningElement {
    @api testCases = [];
    @api workType;
    @track expandedSections = [];
    @track showExecution = false;
    @track showHistory = false;
    @track loading = false;

    handleNewTestCase() {
        const newId = 'new-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
        const newTestCase = {
            id: newId,
            name: '', // will be set by updateTestCaseLabels
            acceptanceCriteria: '',
            steps: [
                { value: 'Log into Salesforce as a Standard User' },
                { value: 'Navigate to ⋮⋮⋮ > ...' },
                { value: '' }
            ],
            expectedOutcomes: [{ id: Date.now().toString(), text: '' }],
            createdDate: '',
            expanded: true
        };
        this.testCases = [...this.testCases, newTestCase];
        this.updateTestCaseLabels();
        if (this.testCases.length === 1) {
            this.expandedSections = [newId];
        } else {
            this.expandedSections = [...this.expandedSections, newId];
        }
        this.dispatchEvent(new CustomEvent('testcaseschange', {
            detail: this.testCases
        }));
    }

    handleAccordionSectionToggle(event) {
        const openSections = event.detail.openSections;
        this.expandedSections = openSections;
        this.testCases = this.testCases.map(tc => ({ ...tc, expanded: openSections.includes(tc.id) }));
    }

    handleEditTestCase(event) {
        const testCaseId = event.currentTarget.dataset.id;
        if (!this.expandedSections.includes(testCaseId)) {
            this.expandedSections = [...this.expandedSections, testCaseId];
        }
    }

    handleExecuteTestCase(event) {
        const testCaseId = event.currentTarget.dataset.id;
        this.selectedTestCase = this.testCases.find(tc => tc.id === testCaseId);
        this.showExecution = true;
    }

    handleViewHistory(event) {
        const testCaseId = event.currentTarget.dataset.id;
        this.selectedTestCase = this.testCases.find(tc => tc.id === testCaseId);
        this.showHistory = true;
    }

    async handleDeleteTestCase(event) {
        const testCaseId = event.currentTarget.dataset.id;
        
        if (confirm('Are you sure you want to delete this test case?')) {
            try {
                this.loading = true;
                this.testCases = this.testCases.filter(tc => tc.id !== testCaseId);
                this.expandedSections = this.expandedSections.filter(id => id !== testCaseId);
                this.updateTestCaseLabels();
                this.dispatchEvent(new CustomEvent('testcaseschange', {
                    detail: this.testCases
                }));
                
                this.showToast('Success', 'Test case deleted successfully', 'success');
            } catch (error) {
                this.showToast('Error', 'Failed to delete test case', 'error');
            } finally {
                this.loading = false;
            }
        }
    }

    handleSave(event) {
        const testCaseData = event.detail;
        const editingId = testCaseData.id;
        const isNew = editingId && editingId.startsWith('new-');
        if (isNew) {
            const newTestCase = {
                ...testCaseData,
                id: Date.now().toString(),
                createdDate: new Date().toLocaleString(),
                expanded: true
            };
            this.testCases = this.testCases.map(tc => tc.id === editingId ? newTestCase : tc);
        } else {
            this.testCases = this.testCases.map(tc => tc.id === editingId ? { ...tc, ...testCaseData } : tc);
        }
        this.updateTestCaseLabels();
        this.dispatchEvent(new CustomEvent('testcaseschange', {
            detail: this.testCases
        }));
    }

    handleCancel(event) {
        const editingId = event.detail && event.detail.id;
        if (editingId && editingId.startsWith('new-')) {
            this.testCases = this.testCases.filter(tc => tc.id !== editingId);
            this.expandedSections = this.expandedSections.filter(id => id !== editingId);
        }
        this.dispatchEvent(new CustomEvent('testcaseschange', {
            detail: this.testCases
        }));
    }

    handleBack() {
        this.showExecution = false;
        this.showHistory = false;
        this.selectedTestCase = null;
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

    get hasTestCases() {
        return this.testCases && this.testCases.length > 0;
    }

    get expandedSectionsSet() {
        return new Set(this.expandedSections);
    }

    updateTestCaseLabels() {
        this.testCases = this.testCases.map((tc, idx) => ({
            ...tc,
            name: `Test Case ${String(idx + 1).padStart(2, '0')}`
        }));
    }
} 