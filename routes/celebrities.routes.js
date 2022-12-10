const router = require("express").Router()

// const { Router } = require("express")
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities", (req, res, next)=>{

    Celebrity.find()
    .then((details)=>{

    res.render("celebrities/celebrities", {details})//corchetes por que es un array and it needs to change to object to be read
    })
    .catch(err=>console.log(err))


})

//we are making a FORM and gonna send info in the req.body 

router.get("/celebrities/create", (req, res, next)=>{

    res.render("celebrities/new-celebrity")


})


router.post("/celebrities/create", (req, res, next)=>{

    console.log("here is the info",req.body)

    

    Celebrity.create(req.body)
    .then(()=> {
        res.redirect("/celebrities")
    })
    .catch(()=>{
        res.render("celebrities/new-celebrities")
    })

})


module.exports = router
