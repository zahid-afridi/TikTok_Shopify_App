import BillingModel from "../model/BillingModel.js"




// Controller function
const getProductNumber = async (req, res) => {
  try {
    const { StoreId } = req.query;

    // Fetch product number based on StoreId
    const p_num = await BillingModel.find({ store_id: StoreId });

    if (!p_num || p_num.length === 0) {
      return res.status(404).json({ message: 'No data found for the given StoreId' });
    }

    console.log('This is the product number:', p_num);

    // Return data with a 200 status
    res.status(200).json({ p_num });

  } catch (error) {
    console.error("Error in getProductNumber:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



//for decrement prd nums 


const updateTicktokProductNumber = async (req, res) => {
    try {
      const { storeId } = req.query;
      //const { newProductNumber } = req.body; // Value to update ticktokPrdNum to
  
      // Validate inputs
      if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
      }


    


     // Fetch only the ticktokPrdNum field from the document
     var productNumberData = await BillingModel.findOne({ store_id: storeId }).select('tiktokProductNumber');

      console.log("this is product number data mm" , productNumberData);
      var prd_num = productNumberData.tiktokProductNumber;

      if(prd_num < 1){
        return res.status(404).json({message: 'You already have No remaining Products!'});
      }
      prd_num--;
  
      // Find the document by store_id and update ticktokPrdNum
      const updatedRecord = await BillingModel.findOneAndUpdate(
        { store_id: storeId },
        { tiktokProductNumber: prd_num },
        { new: true } // Returns the updated document
      );
  
      // Check if the record exists
      if (!updatedRecord) {
        return res.status(404).json({ message: 'No data found for the given Store ID' });
      }
  
      console.log('Updated record:', updatedRecord);
      res.status(200).json({ message: 'Product number updated successfully', data: updatedRecord });
  
    } catch (error) {
      console.error('Error in updateTicktokProductNumber:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };



//for after billing succesfull increment 50
  
// const IncrementTicktokProductNumber = async (req, res) => {
//   try {
//     const { storeId } = req.query;
//     const { c_status, c_price, c_pkg_name , c_billing_id } = req.body;
//     //const { newProductNumber } = req.body; // Value to update ticktokPrdNum to

//     // Validate inputs
//     if (!storeId) {
//       return res.status(400).json({ message: 'Store ID is required' });
//     }

//     console.log("mm data from parameters");
//     console.log(c_status);
//     console.log(c_price);
//     console.log(c_pkg_name);
//     console.log(c_billing_id);
    

    


   // Fetch only the ticktokPrdNum field from the document
//    var productNumberData = await BillingModel.findOne({ store_id: storeId }).select('tiktokProductNumber');

//     console.log("this is product number data mm" , productNumberData);
//     var prd_num = productNumberData.tiktokProductNumber;

//     prd_num=prd_num+50;

//     // Find the document by store_id and update ticktokPrdNum
//     const updatedRecord = await BillingModel.findOneAndUpdate(
//       { store_id: storeId },
//       { tiktokProductNumber: prd_num },
//       { status: c_status },
//       { price: c_price },
//       { packagename: c_pkg_name },
//       { billingId: c_billing_id },

//       { new: true } // Returns the updated document
//     );

//     // Check if the record exists
//     if (!updatedRecord) {
//       return res.status(404).json({ message: 'No data found for the given Store ID' });
//     }

//     console.log('Updated record increment 50:', updatedRecord);
//     res.status(200).json({ message: 'Product increment updated successfully', data: updatedRecord });

//   } catch (error) {
//     console.error('Error in updateTicktokProductNumber:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };



const IncrementTicktokProductNumber = async (req, res) => {
  try {
    const { storeId } = req.query;
    const { c_status, c_price, c_pkg_name, c_billing_id , c_pkg_prd} = req.body;

    // Validate inputs
    if (!storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    // Fetch the current TikTok product number
    const productData = await BillingModel.findOne({ store_id: storeId }).select('tiktokProductNumber');

    if (!productData) {
      return res.status(404).json({ message: 'No data found for the given Store ID' });
    }

    let prd_num = productData.tiktokProductNumber;

    // Increment the product number by 50
    //prd_num += 50;

    // Update all fields in the document
    const updatedRecord = await BillingModel.findOneAndUpdate(
      { store_id: storeId },
      {
        tiktokProductNumber: prd_num,
        status: c_status,
        price: c_price,
        packagename: c_pkg_name,
        billingId: c_billing_id,
        tiktokProductPlan: c_pkg_prd,
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'No data found for the given Store ID' });
    }

    console.log('Updated record:', updatedRecord);
    res.status(200).json({ message: 'Product increment and fields updated successfully', data: updatedRecord });
  } catch (error) {
    console.error('Error in IncrementTicktokProductNumber:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



const incrementFifty = async (req, res) => {
  try {
    const { storeId } = req.query;
    //const { c_status, c_price, c_pkg_name, c_billing_id } = req.body;

    // Validate inputs
    if (!storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    // Fetch the current TikTok product number
    const productData = await BillingModel.findOne({ store_id: storeId }).select('tiktokProductNumber');

     // Fetch the current TikTok product plan
     const productPlan = await BillingModel.findOne({ store_id: storeId }).select('tiktokProductPlan');

    let prd_num = productData.tiktokProductNumber;

    let prd_to_increment = productPlan.tiktokProductPlan;


    // Increment the product number by 50
    prd_num += prd_to_increment;

    // Update all fields in the document
    const updatedRecord = await BillingModel.findOneAndUpdate(
      { store_id: storeId },
      {
        tiktokProductNumber: prd_num,
        status: "active",
        
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'No data found for the given Store ID' });
    }

    console.log('Updated record:', updatedRecord);
    res.status(200).json({ message: 'Product increment and fields updated successfully', data: updatedRecord });
  } catch (error) {
    console.error('Error in IncrementTicktokProductNumber:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

  


 export {getProductNumber , updateTicktokProductNumber , IncrementTicktokProductNumber, incrementFifty}
