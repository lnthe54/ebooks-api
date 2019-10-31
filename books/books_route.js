const router = require("express").Router();
const fs = require('fs');

const books = {
    "aesops fables": {
        title: "Aesop's Fables",
        author: "London: Cassell, Petter and Galpin, 1874.",
        cover: "http://www.read.gov/books/images/aesops_fables_m.jpg"
    }
}




router.get("/", (req, res) => {
    res.json(Object.keys(books))
})

router.get("/:name", (req, res) => {
    let name = req.params.name.toLowerCase();
    let path = process.cwd() + "/books/files/" + name + ".txt";

    fs.readFile(path, 'utf8', function (err, content) {
        if (err) {
            res.status(404).send("the book by the name of " + name + " was not found")
        }

        res.status(200).json({ ...books[name], content })

    });
})

module.exports = router;