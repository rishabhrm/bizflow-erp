import React from 'react';
import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import LeadForm from '@/forms/LeadForm';
import { Tag } from 'antd';

export default function Lead() {
  const translate = useLanguage();
  const entity = 'lead';

  const searchConfig = {
    displayLabels: ['name', 'company'],
    searchFields: 'name,company,email,phone',
    outputValue: '_id',
  };

  const panelTitle = translate('Lead Management');
  const dataTableTitle = translate('Leads Pipeline');
  const entityDisplayLabels = ['name'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'contacted': return 'cyan';
      case 'qualified': return 'purple';
      case 'proposal': return 'orange';
      case 'won': return 'green';
      case 'lost': return 'red';
      default: return 'default';
    }
  };

  const readColumns = [
    { title: translate('Name'), dataIndex: 'name' },
    { title: translate('Company'), dataIndex: 'company' },
    { title: translate('Email'), dataIndex: 'email' },
    { title: translate('Phone'), dataIndex: 'phone' },
    { title: translate('Source'), dataIndex: 'source' },
    { title: translate('Status'), dataIndex: 'status' },
    { title: translate('Notes'), dataIndex: 'notes' },
  ];

  const dataTableColumns = [
    { title: translate('Name'), dataIndex: 'name' },
    { title: translate('Company'), dataIndex: 'company' },
    { title: translate('Email'), dataIndex: 'email' },
    { 
      title: translate('Status'), 
      dataIndex: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status ? status.toUpperCase() : ''}
        </Tag>
      )
    },
  ];

  const Labels = {
    PANEL_TITLE: panelTitle,
    DATATABLE_TITLE: dataTableTitle,
    ADD_NEW_ENTITY: translate('Add New Lead'),
    ENTITY_NAME: translate('Lead'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };

  return (
    <CrudModule
      createForm={<LeadForm />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}