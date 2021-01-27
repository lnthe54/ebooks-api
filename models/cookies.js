const mongoose = require('mongoose')
const Schema = mongoose.Schema


const cookiesSchema = new Schema({
    c_user: {
        type: String
    },
    xs: {
        type: String
    }
})

const CookiesFb = mongoose.model('CookiesFb', cookiesSchema)

module.exports = CookiesFb