const express = require('express');
const router = express.Router();
const Review = require('../models/review');

//Getting all reviews
router.get('/', async (req,res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message : error.message })
    }
});

//Getting review by id
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if( review == null){
            return res.status(404).json({message : "Cannnot find such review"})
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({message : error.message })
    }
    
});

//Creating a review
router.post('/', async (req, res) => {
    const review = new Review({
        reviewId: req.body.reviewId,
        userId: req.body.userId,
        roomId: req.body.roomId,
        rating: req.body.rating,
        comment: req.body.comment
    })
    try {
        const newReview = await review.save();
        res.status(201).json(newReview); 
    } catch (error) {
        res.status(400).json({message : error.message})
    }

});

//Updating the comment in review by id
router.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if( review == null){
            return res.status(404).json({message : "Cannnot find such review"})
        }
        if( req.body.comment != null) {
            review.comment = req.body.comment;
        }
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({message : error.message })
    }
});

//Delete review by id
router.delete('/:id', async (req, res) => {
    try {
        const deleteReview = await Review.findByIdAndDelete(req.params.id);
        res.json({message : "Review Deleted"})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
});



module.exports = router;