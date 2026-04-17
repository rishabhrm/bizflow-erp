import React from 'react';
import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import ExpenseForm from '@/forms/ExpenseForm';
import { useMoney, useDate } from '@/settings';

export default function Expense() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const entity = 'expense';

  const searchConfig = {
    displayLabels: ['name', 'ref'],
    searchFields: 'name,ref',
    outputValue: '_id',
  };

  const panelTitle = translate('Expense');
  const dataTableTitle = translate('Expenses List');
  const entityDisplayLabels = ['name'];

  const readColumns = [
    { title: translate('Expense Name'), dataIndex: 'name' },
    { title: translate('Category'), dataIndex: 'expenseCategory' },
    { title: translate('Amount'), dataIndex: 'amount' },
    { title: translate('Date'), dataIndex: 'date' },
    { title: translate('Reference'), dataIndex: 'ref' },
    { title: translate('Description'), dataIndex: 'description' },
  ];

  const dataTableColumns = [
    { title: translate('Expense Name'), dataIndex: 'name' },
    { title: translate('Category'), dataIndex: 'expenseCategory' },
    { title: translate('Reference'), dataIndex: 'ref' },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Amount'),
      dataIndex: 'amount',
      render: (amount) => moneyFormatter({ amount }),
    },
  ];

  const Labels = {
    PANEL_TITLE: panelTitle,
    DATATABLE_TITLE: dataTableTitle,
    ADD_NEW_ENTITY: translate('Add new expense'),
    ENTITY_NAME: translate('Expense'),
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
      createForm={<ExpenseForm />}
      updateForm={<ExpenseForm isUpdateForm={true} />}
      config={config}
    />
  );
}