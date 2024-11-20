import express from "express";

import {TiktokImport , fetchData , deleteData, editData, getLastDocument, updateTiktokProduct, getidDocument} from "../controllers/TiktockImporter.js";

const TiktokImporterRoutes=express.Router()

TiktokImporterRoutes.post('/tiktokvideo',TiktokImport)
//TiktokImporterRoutes.get('/tiktokdata/:storeId',fetchData)
TiktokImporterRoutes.get('/tiktokdata', fetchData);
TiktokImporterRoutes.delete('/tiktokdelete/:id',deleteData)
TiktokImporterRoutes.put('/tiktokedit/:id',editData)
TiktokImporterRoutes.get('/tiktokLastRow',getLastDocument)
TiktokImporterRoutes.post('/addtoShopify',updateTiktokProduct)
//TiktokImporterRoutes.get('/addtoShopifyfromlisting/:id',getidDocument)
TiktokImporterRoutes.get('/addtoShopifyfromlisting/:id', getidDocument);





// TiktokImporterRoutes.get('/tiktokcheckcount',checkCount)


export default TiktokImporterRoutes