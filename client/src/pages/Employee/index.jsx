import CrudModule from '@/modules/CrudModule/CrudModule';
import EmployeeForm from '@/forms/EmployeeForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Employee() {
  const translate = useLanguage();
  const entity = 'employee';
  
  const searchConfig = {
    displayLabels: ['name', 'designation'],
    searchFields: 'name,designation',
  };
  
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Employees'),
    DATATABLE_TITLE: translate('Employee List'),
    ADD_NEW_ENTITY: translate('Add New Employee'),
    ENTITY_NAME: translate('Employee'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <CrudModule
      createForm={<EmployeeForm />}
      updateForm={<EmployeeForm isUpdateForm={true} />}
      config={config}
    />
  );
}