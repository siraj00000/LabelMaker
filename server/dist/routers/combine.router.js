import express from 'express';
import authAdmin, { authCompanyAdmin, authManufacturerAdmin } from '../middleware/auth_admin.middleware.js';
import { protectMiddleware } from '../middleware/protect.middleware.js';
import combineController from '../controllers/combine.controller.js';
const combineRouter = express.Router();
combineRouter
    .get('/associates-collections', protectMiddleware, authAdmin, combineController.fetchAccessibiltyAssociatesCollections)
    .get('/roles', protectMiddleware, authAdmin, combineController.roleBasedInfo)
    .get('/fetch-company-brands', protectMiddleware, authCompanyAdmin, combineController.fetchCompanyBrands)
    .get('/fetch-company-subcategories', protectMiddleware, authCompanyAdmin, combineController.fetchCompanySubcategories)
    .get('/fetch-manufacturers-company-brands', protectMiddleware, authManufacturerAdmin, combineController.fetchManufacturerBrands)
    .get('/fetch-brand-products/:brand_id', protectMiddleware, authManufacturerAdmin, combineController.fetchManufacturerBrandProducts)
    .post('/fetch-brands-products', protectMiddleware, authManufacturerAdmin, combineController.fetchMultiManufacturerBrandProducts)
    .get('/super-admin-label-stats', protectMiddleware, authAdmin, combineController.superAdminLabelStats)
    .get('/company-label-stats', protectMiddleware, authCompanyAdmin, combineController.companyLabelStats)
    .post('/manufacturer-label-stats', protectMiddleware, authManufacturerAdmin, combineController.manufacturerLabelStats)
    .post('/label-batchs-and-variants', protectMiddleware, authManufacturerAdmin, combineController.getBatchNumbersAndVariants)
    .post('/label-batch-numbers', protectMiddleware, authManufacturerAdmin, combineController.labelBatchNumbers);
export default combineRouter;
//# sourceMappingURL=combine.router.js.map