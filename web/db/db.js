import mongoose from 'mongoose'


const DbCon=async()=>{
    try {
        // await mongoose.connect('mongodb://localhost:27017/tiktok')
await mongoose.connect('mongodb+srv://zahid:zahid123@cluster0.eg9ftuk.mongodb.net/TikTok_App')

        console.log('mongodb is connected!')
    } catch (error) {
        console.log('mongodb connection error',error)
    }
}
export default DbCon