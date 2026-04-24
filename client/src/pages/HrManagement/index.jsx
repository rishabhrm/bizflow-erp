import CrudModule from '@/modules/CrudModule/CrudModule';
import HrManagementForm from '@/forms/HrManagementForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function HrManagement() {
  const translate = useLanguage();
  const entity = 'hrManagement';
  
  const searchConfig = {
    displayLabels: ['employeeName'],
    searchFields: 'employeeName',
  };
  
  const deleteModalLabels = ['employeeName'];

  const Labels = {
    PANEL_TITLE: translate('HR Management'),
    DATATABLE_TITLE: translate('HR Actions & Records'),
    ADD_NEW_ENTITY: translate('Add HR Record'),
    ENTITY_NAME: translate('HR Record'),
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
      createForm={<HrManagementForm />}
      updateForm={<HrManagementForm isUpdateForm={true} />}
      config={config}
    />
  );
}