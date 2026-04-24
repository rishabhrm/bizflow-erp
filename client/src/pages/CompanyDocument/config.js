export const fields = {
  documentName: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
  },
  accessControl: {
    type: 'select',
    renderAsTag: true,
    options: [
      { value: 'All Employees', label: 'All Employees', color: 'green' },
      { value: 'Managers Only', label: 'Managers Only', color: 'blue' },
      { value: 'HR Only', label: 'HR Only', color: 'purple' },
      { value: 'Admins Only', label: 'Admins Only', color: 'red' },
    ],
  },
  file: {
    type: 'file', // <--- Uses our new download button renderer
    label: 'Document', 
    disableForTable: false, // Ensures the button shows up on the main list
  },
};