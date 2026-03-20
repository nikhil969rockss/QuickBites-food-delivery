import mongoose from "mongoose";


async function connectDB(){
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`Database Connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Database connection Error: ${error.message}`)
        
    }

}

export default connectDB