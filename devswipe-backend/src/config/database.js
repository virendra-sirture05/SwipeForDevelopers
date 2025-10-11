// r29XmO7ihL0LAgWT
const mongoose = require('mongoose');

const connectDb = async() =>{
    await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}
// const connectDb = async() =>{
//     await mongoose.connect("mongodb://127.0.0.1:27017/devSwipe")
// }

module.exports = connectDb
