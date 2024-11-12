import mongoose from 'mongoose'


const DbCon=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/tiktok')
        console.log('mongodb is connected!')
    } catch (error) {
        console.log('mongodb connection error',error)
    }
}
export default DbCon