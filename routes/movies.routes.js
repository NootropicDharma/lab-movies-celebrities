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

    //we are only finding the Celebrity because we need it for selection otherwise it would just be a render of a form


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
    .populate("cast")
    .then(movie=>{
        
            res.render("movies/movie-details", movie)
            
    })
    .catch(err=>{console.log(err)})

})



router.post("/movies/:id/delete", (req, res, next)=>{

    const {id} = req.params



    Movie.findByIdAndDelete(id)
    .then(()=>{
        res.redirect("/movies")

    })
    .catch(err=>console.log(err))
    




})


//UPDATE

router.get("/movies/:id/edit", (req, res, next)=>{

    const actoresReales = []

    const {id} = req.params
    

    Movie.findById(id)
    .populate("cast")
    .then(data=>{ 

        Celebrity.find()
        .then(celebridades=>{
            


            data.cast.forEach(actor=>{
                celebridades.forEach(actore=>{
                    if(actor.id === actore.id){
                        console.log("selected", actor.id)
                        return true
                    }
                })
            })

            //harland wasn't able to figure this one out lol 


            res.render("movies/edit-movies", {data, celebridades})
        })
        .catch(err=>console.log(err))

        
    })
    .catch(err=>console.log(err))




})

router.post("/movies/:id/edit", (req, res, next)=>{
    res.send(req.body)
})




module.exports = router
