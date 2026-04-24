import CrudModule from '@/modules/CrudModule/CrudModule';
import AnnouncementForm from '@/forms/AnnouncementForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Announcement() {
  const translate = useLanguage();
  const entity = 'announcement';
  
  const searchConfig = {
    displayLabels: ['title'],
    searchFields: 'title',
  };
  
  const deleteModalLabels = ['title'];

  const Labels = {
    PANEL_TITLE: translate('Announcements'),
    DATATABLE_TITLE: translate('Announcement History'),
    ADD_NEW_ENTITY: translate('Post Announcement'),
    ENTITY_NAME: translate('Announcement'),
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
      createForm={<AnnouncementForm />}
      updateForm={<AnnouncementForm isUpdateForm={true} />}
      config={config}
    />
  );
}