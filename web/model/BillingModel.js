import mongoose from "mongoose";

const BillingShecma= new mongoose.Schema({
    store_id:{
        type:String,
    },
    status:{
        type:String,
        default: null,
    },
    price:{
        type:String,
        default: null,
    },
    billingId:{
        type:String,
        default: null,
    },
    packagename:{
        type:String,
        default: null,
    },
    tiktokProductNumber:{
        type:Number,
        default:0
    },
    tiktokProductPlan:{
        type:Number,
        default:0
    },
    
},{timestamps:String})

const BillingModel= mongoose.model('store_billings',BillingShecma)


export default BillingModel