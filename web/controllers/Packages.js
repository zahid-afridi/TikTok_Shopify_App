import TikTok_Packages_Modal from "../model/TikTokPackges.js";



export const fetchPackage = async(req , res)=>{
console.log('packages api hiting succesfully')
    try{
        const packages= await TikTok_Packages_Modal.find()
        if (!packages) {
      
      return res.status(404).json({sucess:false,message: "Packages not found" });
        }
        return res.status(200).json({sucess:true,packages})     
    }
    catch(error){
      console.error("error! ",error);
      res.status(500).json({message: "Internal server Error!" , error: error.message});

    }


  };

  