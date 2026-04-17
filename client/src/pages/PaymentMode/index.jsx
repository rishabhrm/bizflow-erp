import React from 'react';
import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import PaymentModeForm from '@/forms/PaymentModeForm';

export default function PaymentMode() {
  const translate = useLanguage();
  const entity = 'paymentmode';
  
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const panelTitle = translate('Payment Mode');
  const dataTableTitle = translate('Payment Modes List');
  const entityDisplayLabels = ['name'];

  const readColumns = [
    { title: translate('Payment Mode'), dataIndex: 'name' },
    { title: translate('Description'), dataIndex: 'description' },
    { title: translate('Enabled'), dataIndex: 'enabled' },
    { title: translate('Default'), dataIndex: 'isDefault' },
  ];

  const dataTableColumns = [
    { title: translate('Payment Mode'), dataIndex: 'name' },
    { title: translate('Description'), dataIndex: 'description' },
    { 
      title: translate('Enabled'), 
      dataIndex: 'enabled',
      render: (enabled) => (enabled ? 'Yes' : 'No')
    },
    { 
      title: translate('Default'), 
      dataIndex: 'isDefault',
      render: (isDefault) => (isDefault ? 'Yes' : 'No')
    },
  ];

  const Labels = {
    PANEL_TITLE: panelTitle,
    DATATABLE_TITLE: dataTableTitle,
    ADD_NEW_ENTITY: translate('Add new payment mode'),
    ENTITY_NAME: translate('Payment Mode'),
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
      createForm={<PaymentModeForm />}
      updateForm={<PaymentModeForm isUpdateForm={true} />}
      config={config}
    />
  );
}