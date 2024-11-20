 import express from 'express'
// import { GetPyament, UserPay,StorePyment, FreePakage, custompakage, getcustompakage } from '../controllers/Billing.js'

import { getProductNumber, incrementFifty, IncrementTicktokProductNumber, updateTicktokProductNumber} from '../controllers/Billing.js';

 const BillingRoutes=express.Router()


//yaaan sy mubashir ka kaam 


BillingRoutes.get('/ticktokPrdNums' , getProductNumber);
BillingRoutes.put('/decremenrPrdNums' , updateTicktokProductNumber);
BillingRoutes.put('/IncPrdNums' , IncrementTicktokProductNumber);
BillingRoutes.put('/IncFifty' , incrementFifty);





 export default BillingRoutes