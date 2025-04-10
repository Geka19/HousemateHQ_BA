//connect to database with Mongo URI in dotenv
const mongoose = require('mongoose')
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to db using env')
  }
  catch (error){
    console.log(error)
  }
}
module.exports = connectDB;