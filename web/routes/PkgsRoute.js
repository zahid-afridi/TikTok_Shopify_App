import express from 'express'

import { fetchPackage } from '../controllers/Packages.js'; 

 const PkgRoute=express.Router()


//yaaan sy mubashir ka kaam 


PkgRoute.get('/fetchpkgs' , fetchPackage);






 export default PkgRoute