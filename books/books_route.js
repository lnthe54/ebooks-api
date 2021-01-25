const router = require("express").Router();
const fs = require('fs');

const books = require("./books.json")
const newBooks = require("./newBooks.json")
const allCookies = require("./user-cookies.json")

router.get("/", (req, res) => {
    let page = req.query.page
    if (!page) {
        res.json(books)
    } else {
        let temp = {}
        let count = 0;

        for (let key in books) {
            if (count >= Number(page) * 50 && count <= (Number(page) * 50) + 50) {
                temp[key] = books[key]
            }
            count++
        }
        res.status(200).json(temp)
    }

})

router.get("/newbooks", (req, res) => {
    let page = req.query.page
    if (!page) {
        res.json(newBooks)
    } else {
        let temp = {}
        let count = 0;

        for (let key in newBooks) {
            if (count >= Number(page) * 50 && count <= (Number(page) * 50) + 50) {
                temp[key] = newBooks[key]
            }
            count++
        }
        res.status(200).json(temp)
    }

})

router.get("/detail/:name", (req, res) => {
    let name = req.params.name.toLowerCase();
    let path = process.cwd() + "/books/files/" + name + ".txt";

    fs.readFile(path, 'utf8', function (err, content) {
        if (err) {
            res.status(404).send("the book by the name of " + name + " was not found").end()
        }

        res.status(200).json({ ...books[name], content })

    });
})

router.get("/upload-cookies/:name", (req, res) => {
    let _id = Math.floor((Math.random() * 1000) + 1);
    let c_user = req.params.name.toLowerCase();

    var obj = {
        "data": []
    }

    let path = process.cwd() + "/books/user-cookies.json";

    fs.readFile(path, 'utf8', function readFileCallback(err, result_user){
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(result_user);
            obj.data.push({id: _id, user_cookies: c_user});
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

router.get("/allCookies", (req, res) => {
    let page = req.query.page
    if (!page) {
        res.json(allCookies)
    } else {
        let temp = {}
        let count = 0;

        for (let key in this.allCookies) {
            if (count >= Number(page) * 50 && count <= (Number(page) * 50) + 50) {
                temp[key] = newBooks[key]
            }
            count++
        }
        res.status(200).json(temp)
    }

})

module.exports = router;