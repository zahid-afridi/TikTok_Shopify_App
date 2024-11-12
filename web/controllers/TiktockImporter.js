
//import axios from "axios"
import TiktokModel from "../model/Tiktok.js"



export const TiktokImport = async (req, res) => {
    try {
      
      const { url } = req.body;
      console.log("Incoming URL:", url);
  
     
      const apiUrl = `https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=${url}`;
  
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e04ea4d85dmshc529ae0cb91de78p15ffa5jsn3a765cb92b98', 
          'X-RapidAPI-Host': 'tiktok-video-downloader-api.p.rapidapi.com'
        }
      });
  
    
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
    
      const data = await response.json();
      console.log("Fetched Data:", data);

     var made_url = "https://www.tiktok.com/embed/v2/"+data.id;

      const newTikTokRecord = new TiktokModel({
        video_id: data.id,
        username: data.author.username,
        description: data.description,
        download_url: data.downloadUrl,
        avatar: data.author.avatar,
        embed_url: made_url,
        check_count:1,
      });
  
      // Save the new record to the database
      await newTikTokRecord.save();
  



  
     
      res.status(200).json({
        message: "Data fetched successfully!",
        data:newTikTokRecord
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

  export const fetchData = async(req , res)=>{

    try{

      const records = await TiktokModel.find();
      res.status(200).json({message:"Fetching Success!",
        data: records
      });

    }
    catch(error){
      console.error("error! ",error);
      res.staus(500).json({message: "Internal server Error!" , error: error.message});

    }


  };

  export const deleteData = async (req, res) => {
    const { id } = req.params; // Capture the id from the request parameters
  
    try {
      console.log("its in api");
      if (id) {
        // Delete a single record if id is provided
        const deletedRecord = await TiktokModel.findByIdAndDelete(id);
  
        if (!deletedRecord) {
          return res.status(404).json({ message: "Record not found!" });
        }
  
        return res.status(200).json({
          message: "Record deleted successfully!",
          data: deletedRecord,
        });
      } else {
        // Fetch all records if no id is provided
        const records = await TiktokModel.find();
        res.status(200).json({
          message: "Fetching Success!",
          data: records,
        });
      }
    } catch (error) {
      console.error("Error! ", error);
      res.status(500).json({
        message: "Internal server Error!",
        error: error.message,
      });
    }
  };


  //edit data

  
  export const editData = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the URL parameter
      const updatedData = req.body; // Get the updated data from the request body
  
      // Validate that the request body contains the necessary fields (you can adjust based on your schema)
      if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'No data provided to update.' });
      }
  
      // Find the record by ID and update it with the new data
      const updatedRecord = await TiktokModel.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure the update runs validation checks
      });
  
      // If no record was found with the provided ID
      if (!updatedRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      // Return the updated record
      res.status(200).json({
        message: 'Record updated successfully',
        data: updatedRecord,
      });
    } catch (error) {
      // Log the error for debugging
      console.error(error);
  
      // Handle the error properly by sending a 500 status and the error message
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };

  //for checking count 
  
  // export const checkCount = async (req, res) => {
  //   try {
  //     const lastRecord = await TiktokModel.findOne().sort({ createdAt: -1 }).select('check_count'); // Select only check_count
  //     if (!lastRecord) {
  //       return res.status(404).json({ message: "No records found" });
  //     }
  
  //     res.status(200).json({
  //       message: "Fetching Success!",
  //       data: lastRecord.check_count // Return only check_count value
  //     });
  
  //   } catch (error) {
  //     console.error("Error! ", error);
  //     res.status(500).json({ message: "Internal server Error!", error: error.message });
  //   }
  // };
  
  //for fetching last row data
  export const getLastDocument = async (req, res) => {
    try {
        const lastDocument = await TiktokModel.findOne().sort({ createdAt: -1 });
        
        if (lastDocument) {
            console.log("This is my backend getLastDocument");
            return res.status(200).json({
                success: true,
                data: lastDocument,
                message: "Last document fetched successfully"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No documents found"
            });
        }
    } catch (error) {
        console.error("Error fetching last document:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// Controller function in Node.js (assuming Express and Mongoose are being used)
export const updateTiktokProduct = async (req, res) => {
  try {
      const { _id, shopify_product_id } = req.body;

      // Ensure the required fields are provided
      if (!_id || !shopify_product_id) {
          return res.status(400).json({ message: "Missing required fields: _id or shopify_product_id" });
      }

      // Update the document in MongoDB
      const updatedProduct = await TiktokModel.findByIdAndUpdate(
          _id,
          { is_shopify: 1, shopify_product_id },
          { new: true } // Returns the updated document
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Server error" });
  }
};




//for fetching the given id data
export const getidDocument = async (req, res) => {
  const { id } = req.params; // Use req.params instead of req.query
  console.log("This is in getidDocument");

  try {
    const lastDocument = await TiktokModel.findById(id);

    if (lastDocument) {
      console.log("This is my backend getIdDocument");
      return res.status(200).json({
        success: true,
        data: lastDocument,
        message: "ID document fetched successfully"
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No document found"
      });
    }
  } catch (error) {
    console.error("Error fetching last document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};



  
  
  



