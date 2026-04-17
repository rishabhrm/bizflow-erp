import React from 'react';
import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import InventoryForm from '@/forms/InventoryForm';
import { useMoney } from '@/settings';

export default function Inventory() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const entity = 'inventory';

  const searchConfig = {
    displayLabels: ['name', 'sku'],
    searchFields: 'name,sku',
    outputValue: '_id',
  };

  const panelTitle = translate('Inventory');
  const dataTableTitle = translate('Products List');
  const entityDisplayLabels = ['name'];

  const readColumns = [
    { title: translate('Name'), dataIndex: 'name' },
    { title: translate('SKU'), dataIndex: 'sku' },
    { title: translate('Description'), dataIndex: 'description' },
    { title: translate('Stock Quantity'), dataIndex: 'quantity' },
    { title: translate('Price'), dataIndex: 'price' },
  ];

  const dataTableColumns = [
    { title: translate('Name'), dataIndex: 'name' },
    { title: translate('SKU'), dataIndex: 'sku' },
    { title: translate('Stock Quantity'), dataIndex: 'quantity' },
    {
      title: translate('Price'),
      dataIndex: 'price',
      render: (amount) => moneyFormatter({ amount }),
    },
  ];

  const Labels = {
    PANEL_TITLE: panelTitle,
    DATATABLE_TITLE: dataTableTitle,
    ADD_NEW_ENTITY: translate('Add new product'),
    ENTITY_NAME: translate('Product'),
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
      createForm={<InventoryForm />}
      updateForm={<InventoryForm isUpdateForm={true} />}
      config={config}
    />
  );
}