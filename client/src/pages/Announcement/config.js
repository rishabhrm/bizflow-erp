export const fields = {
  title: {
    type: 'string',
    required: true,
  },
  content: {
    type: 'string',
    required: true,
    disableForTable: true, // Hides long text from the table view
  },
  status: {
    type: 'select',
    renderAsTag: true,
    options: [
      { value: 'Active', label: 'Active', color: 'green' },
      { value: 'Archived', label: 'Archived', color: 'default' },
    ],
  },
  created: {
    type: 'date',
  },
};