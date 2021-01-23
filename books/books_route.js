const router = require("express").Router();
const fs = require('fs');

const books = require("./books.json")
const newBooks = require("./newBooks.json")


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

module.exports = router;