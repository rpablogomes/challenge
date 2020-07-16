const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const data = require("./data")
const e = require("express")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log("Server is running!")
})

// routes

server.get("/", function (req, res) {
    return res.render("index", { foods : data })
})

server.get("/about", function (req, res) {
    return res.render("about")
})

server.get("/receipts", function (req, res) {
    return res.render("receipts", { foods: data })
})

server.get("/receipt", function (req, res){
    return res.render("receipt")
})

// server.get("/receipt/:index", function (req, res) {
//     const recipes = []; // Array de receitas carregadas do data.js
//     const recipeIndex = req.params.index;
//     console.log(receipts[recipeIndex]);
//   })

server.use(function (req, res) {
    res.status(404).render("not-found",);
})