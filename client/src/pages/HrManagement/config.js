export const fields = {
  // 1. We map to the linked employee's Name
  employee: {
    type: 'string',
    label: 'Employee Name',
    dataIndex: ['employee', 'name'], 
    required: true,
  },
  
  // 2. We reach into the linked employee object to grab their Joining Date
  dateOfJoining: {
    type: 'date',
    label: 'Joining Date',
    dataIndex: ['employee', 'dateOfJoining'], 
    // Notice we do NOT need to add this to HrManagementForm.jsx. 
    // It will purely pull the data for the Table and Info panels!
  },

  onboarding: {
    type: 'select',
    renderAsTag: true,
    options: [
      { value: 'Pending', label: 'Pending', color: 'orange' },
      { value: 'In Progress', label: 'In Progress', color: 'blue' },
      { value: 'Completed', label: 'Completed', color: 'green' },
    ],
  },
  offboarding: {
    type: 'select',
    renderAsTag: true,
    options: [
      { value: 'N/A', label: 'N/A', color: 'default' },
      { value: 'Pending', label: 'Pending', color: 'orange' },
      { value: 'Completed', label: 'Completed', color: 'red' },
    ],
  },
  employeeDataFetch: {
    type: 'boolean', 
  },
  noticeIssue: {
    type: 'string',
  },
};