const router = require("express").Router()

// const { Router } = require("express")

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
const { render } = require("../app")



router.get("/movies", (req, res, next)=>{
    Movie.find()
    .then(movies=> res.render("movies/movies", {movies}))
    .catch(err=>console.log(err))
})



router.get("/movies/create", (req, res, next)=>{

    Celebrity.find()
    .then(celebridades=>{
        res.render("movies/new-movie",{celebridades})
    })
    .catch(err=>console.log(err))

})


router.post("/movies/create", (req, res, next)=>{

    const {title, genre, plot, cast} = req.body

    Movie.create({title, genre, plot, cast})
    .then(nuevaPelicula => {
        console.log(nuevaPelicula)
        res.redirect(`/movies/${nuevaPelicula._id}`)
    })
    .catch(err=>console.log(err))
   
})



router.get("/movies/:id", (req, res, next)=>{

    const {id} = req.params


    Movie.findById(id)
    .then(movie=>{
            res.render("movies/movie-details", {movie})
    })
    .catch(err=>{console.log(err)})

})










module.exports = router
