# Test Case Composer - Salesforce LWC Implementation

This is a Salesforce Lightning Web Component (LWC) implementation of the Jira Forge Test Case Composer application. It provides functionality for creating, editing, executing, and tracking test cases with acceptance criteria.

## Components

### 1. testCaseComposer (Main Component)
- **Purpose**: Main container component that manages the overall application state
- **Features**: 
  - Loads test cases from Salesforce
  - Handles saving test cases
  - Manages loading states and error handling
- **Exposed**: Yes - can be used on App Pages, Record Pages, and Home Pages

### 2. testCaseList
- **Purpose**: Displays and manages the list of test cases
- **Features**:
  - Add new test cases
  - Edit existing test cases
  - Delete test cases
  - Reorder test cases (move up/down)
  - View mode for test case summaries
- **Exposed**: No - internal component

### 3. testCaseEditor
- **Purpose**: Provides detailed editing interface for individual test cases
- **Features**:
  - Edit acceptance criteria
  - Add/edit/reorder test steps
  - Add/edit/reorder expected outcomes
  - Save/cancel functionality
- **Exposed**: No - internal component

### 4. testExecution
- **Purpose**: Interface for executing tests and marking outcomes
- **Features**:
  - Display test case details
  - Show test steps
  - Mark expected outcomes as pass/fail
  - Visual execution status indicators
  - Save test results
- **Exposed**: No - internal component

### 5. testHistory
- **Purpose**: View historical test execution results
- **Features**:
  - Display all test executions for a test case
  - Show execution dates and results
  - Visual pass/fail indicators
- **Exposed**: No - internal component

## Custom Objects

### TestCase__c
- **Purpose**: Stores test case data
- **Fields**:
  - `Name` (AutoNumber): TC-0001, TC-0002, etc.
  - `AcceptanceCriteria__c` (Long Text Area): Description of acceptance criteria
  - `Steps__c` (Long Text Area): JSON array of test steps
  - `ExpectedOutcomes__c` (Long Text Area): JSON array of expected outcomes

### TestExecution__c
- **Purpose**: Stores test execution results
- **Fields**:
  - `Name` (AutoNumber): TE-0001, TE-0002, etc.
  - `TestCase__c` (Lookup): Reference to the test case
  - `Outcomes__c` (Long Text Area): JSON array of execution results

## Apex Controller

*Note: The TestCaseController has been removed. A new controller will need to be implemented to handle the data operations.*

## Data Structure

### Test Case JSON Structure
```json
{
  "Id": "a0X...",
  "Name": "TC-0001",
  "AcceptanceCriteria__c": "Description of acceptance criteria",
  "Steps__c": "[\"Step 1\", \"Step 2\", \"Step 3\"]",
  "ExpectedOutcomes__c": "[{\"text\": \"Expected outcome 1\", \"passed\": null}, {\"text\": \"Expected outcome 2\", \"passed\": null}]"
}
```

### Test Execution JSON Structure
```json
{
  "Id": "a0Y...",
  "Name": "TE-0001",
  "TestCase__c": "a0X...",
  "Outcomes__c": "[{\"text\": \"Expected outcome 1\", \"passed\": true}, {\"text\": \"Expected outcome 2\", \"passed\": false}]"
}
```

## Installation

1. Deploy the LWC components to your Salesforce org
2. Deploy the Apex controller
3. Deploy the custom objects and fields
4. Add the `testCaseComposer` component to a Lightning page

## Usage

1. **Creating Test Cases**: Click "Add Test Case" to create a new test case
2. **Editing Test Cases**: Click the edit icon to modify test case details
3. **Reordering**: Use the up/down arrows to reorder test cases, steps, or outcomes
4. **Test Execution**: Execute tests and mark outcomes as pass/fail
5. **History**: View historical test execution results

## Key Features

- **Drag & Drop Alternative**: Uses up/down buttons for reordering (Salesforce limitation)
- **Real-time Updates**: Changes are saved immediately to Salesforce
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Uses SLDS (Salesforce Lightning Design System) for consistent UI
- **Data Persistence**: All data is stored in Salesforce custom objects

## Limitations

- No true drag & drop (Salesforce LWC limitation)
- JSON storage for complex data (could be normalized in future)
- No real-time collaboration (single-user editing)

## Future Enhancements

- Add test case templates
- Implement test case categories/tags
- Add reporting and analytics
- Support for test case attachments
- Integration with other Salesforce objects
- Bulk operations for test cases 