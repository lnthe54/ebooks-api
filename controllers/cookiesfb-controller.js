const CookiesFb = require('../models/cookies')

// show list
const index = (req, res, next) => {
    CookiesFb.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

const store = (req, res, next) => {
    console.log(req.body)
    let cookiesFb = new CookiesFb({
        c_user: "req.body.c_user",
        xs: "req.body.xs"
    })
    cookiesFb.save()
    .then(response => {
        res.json({
            message: 'Add success!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

module.exports = {
    index, store
}