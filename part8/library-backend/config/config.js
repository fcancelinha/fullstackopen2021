require('dotenv').config()

const MONGODB_URI = process.env.MONGO_URI
const SECRET = process.env.SECRET
    
module.exports = {
    MONGODB_URI,
    SECRET
}
