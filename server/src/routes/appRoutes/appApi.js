const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const appControllers = require('@/controllers/appControllers');
const { routesList } = require('@/models/utils');

// IMPORT OUR NEW REPORT CONTROLLER
const reportController = require('@/controllers/appControllers/reportController');

// IMPORT UPLOAD MIDDLEWARE
const { singleStorageUpload } = require('@/middlewares/uploadMiddleware');

// ---------------------------------------------------------------------------
// INTERCEPT FILE UPLOADS BEFORE THE DYNAMIC ROUTES
// ---------------------------------------------------------------------------
// This grabs the physical file, saves it to /uploads/companydocument, and attaches the file path to req.body.file
router.route('/companydocument/create').post(
  singleStorageUpload({ entity: 'companydocument', fieldName: 'file', fileType: 'all' }),
  catchErrors(appControllers['companyDocumentController']['create'])
);

router.route('/companydocument/update/:id').patch(
  singleStorageUpload({ entity: 'companydocument', fieldName: 'file', fileType: 'all' }),
  catchErrors(appControllers['companyDocumentController']['update'])
);
// ---------------------------------------------------------------------------

const routerApp = (entity, controller) => {
  router.route(`/${entity}/create`).post(catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  if (entity === 'invoice' || entity === 'quote' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).get(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  // We skip applying the default create/update to companydocument because we handled it above manually
  if (entity !== 'companydocument') {
    const controller = appControllers[controllerName];
    routerApp(entity, controller);
  } else {
    // For company documents, we still want the default read, delete, list, etc.
    const controller = appControllers[controllerName];
    router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
    router.route(`/${entity}/delete/:id`).delete(catchErrors(controller['delete']));
    router.route(`/${entity}/search`).get(catchErrors(controller['search']));
    router.route(`/${entity}/list`).get(catchErrors(controller['list']));
    router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
    router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  }
});

// REGISTER THE CUSTOM REPORT ROUTE
router.route('/report/summary').get(catchErrors(reportController.summary));

module.exports = router;