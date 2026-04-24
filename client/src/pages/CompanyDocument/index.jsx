import CrudModule from '@/modules/CrudModule/CrudModule';
import CompanyDocumentForm from '@/forms/CompanyDocumentForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function CompanyDocument() {
  const translate = useLanguage();
  
  const entity = 'companydocument'; 
  
  const searchConfig = {
    displayLabels: ['documentName'],
    searchFields: 'documentName',
  };
  
  const deleteModalLabels = ['documentName'];

  const Labels = {
    PANEL_TITLE: translate('Company Documents'),
    DATATABLE_TITLE: translate('Document Library'),
    ADD_NEW_ENTITY: translate('Upload Document'),
    ENTITY_NAME: translate('Document'),
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
    // REMOVED withUpload from here!
  };

  return (
    <CrudModule
      createForm={<CompanyDocumentForm />}
      updateForm={<CompanyDocumentForm isUpdateForm={true} />}
      config={config}
      withUpload={true} /* <--- ADDED HERE AS A DIRECT PROP! */
    />
  );
}