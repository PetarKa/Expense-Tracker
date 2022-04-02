const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_nwtdb',
    dateStrings: true,
    decimalNumbers: true
})


app.post("/register", (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("SELECT idUsers FROM users WHERE username=? ", [username], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                res.send(false);
            } else {
                db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(true)
                    }
                })
            }
        }
    })



});

app.post("/login", (req, res) => {

    const username = req.body.username
    const password = req.body.password
    let isLoginGood = false;
    let id = 0;

    db.query("SELECT idUsers FROM users WHERE username= ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        console.log(result)
        if (result.length > 0) {
            isLoginGood = true;
            console.log(isLoginGood)
            id = result[0].idUsers
        }

        res.send({
            isLoginGood: isLoginGood,
            id: id
        })
    })


});

app.get("/data", (req, res) => {


    db.query("SELECT id,title,amount,date FROM users INNER JOIN expenses ON users.idUsers=expenses.idUser WHERE username=?", [req.query.username], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post("/data", (req, res) => {//dodat id korisnika

    let title = req.body.title
    let amount = req.body.amount
    let date = req.body.date
    let userID = req.body.userID

    db.query("INSERT INTO expenses (title,amount,date,idUser) VALUES (?,?,?,?)", [title, amount, date, userID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })

})

app.listen(3001, () => {
    console.log("running at:")
});
