export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  dob: {
    type: 'date',
    required: true,
  },
  designation: {
    type: 'string',
    required: true,
  },
  dateOfJoining: {
    type: 'date',
    required: true,
  },
  attendance: {
    type: 'number',
  },
  status: {
    type: 'select',
    renderAsTag: true,
    required: true,
    options: [
      { value: 'active', label: 'Active', color: 'green' },
      { value: 'former', label: 'Former', color: 'volcano' },
    ],
  },
};