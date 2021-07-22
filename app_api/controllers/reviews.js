const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

/* Internal Function */
const updateAverageRating = (locationId) =>{
    Loc
        .findById(locationId)
        .select('rating reviews')
        .exec((err, location)=>{
            if(err){
                return res.status(400).json(err);
            } else if(!location){
                return res.status(404).json({message: "Location not found!"});
            }
            if(location.reviews && location.reviews.length>0){
                let count=location.reviews.length;
                let sum=0;
                for(let i=0; i<location.reviews.length; i++){
                    sum += location.reviews[i].rating;
                }
                location.rating = parseInt(sum/count, 10);
                location.save(err => {
                    if(err){
                        console.log(err);
                    } else{
                        console.log(`Average rating updated to ${location.rating}`);
                    }
                });
            }
            
        });
};
const doAddReview = (req, res, location) => {
    if(!location){
        return res.status(404).json({message: 'Location not found!'});
    }
    const {author, rating, reviewText} = req.body;
    location.reviews.push({
        author,
        rating,
        reviewText
    });
    location.save((err, location) => {
        if(err){
            return res.status(400).json(err);
        }
        updateAverageRating(location._id);
        const thisReview = location.reviews[location.reviews.length-1];
        return res.status(201).json(thisReview);
    });
};

/* API */
const createReview = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .select('reviews')
        .exec((err, location) => {
            if(!location){
                return res.status(404).json({message: 'Location not found!'});
            } else if(err){
                return res.status(404).json(err);
            }
            doAddReview(req, res, location);
        });
};

const getReviewById = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((err, location) => {
            if(!location){
                return res.status(404).json({message: 'Location not found!'});
            } else if(err){
                return res.status(404).json(err);
            }
            if(location.reviews && location.reviews.length>0){
                let review = location.reviews.id(req.params.reviewId);
                if(!review) return res.status(404).json({message: 'Review not found!'});
                let response = {
                    loc: {
                        name: location.name,
                        id: req.params.locationId
                    },
                    review: review
                }
                return res.status(200).json(response);
            } else{
                return res.status(404).json({message: 'No reviews found!'});
            }
            
        });
};

const updateReviewById = (req, res) => {
    if(!req.params.locationId||!req.params.reviewId){
        return res.status(400).json({message: "locationId and reviewId params are both required!"});
    }
    Loc
        .findById(req.params.locationId)
        .select("name reviews")
        .exec((err, location)=>{
            if(err){
                return res.status(400).json(err);
            } else if(!location){
                return res.status(404).json({message: "Location not found!"});
            }  
            if(location.reviews && location.reviews.length>0){
                let review = location.reviews.id(req.params.reviewId);
                if(!review){
                    return res.status(404).json({message: "Review not found!"});
                }
                const {author, reviewText, rating} = req.body;
                review.author = author;
                review.reviewText = reviewText;
                review.rating = rating;
                location.save((err, loc)=>{
                    if(err){
                        return res.status(400).json(err);
                    }
                    updateAverageRating(loc._id);
                    res.status(200).json(review);
                });
            } else{
                res.status(404).json({message: "No review to update!"});
            }
        });
};

const deleteReviewById = (req, res) => {
    const locationId = req.params.locationId;
    const reviewId = req.params.reviewId;
    if(!locationId || !reviewId){
        return res.status(400).json({message: "locationId and reviewId params are both required"});
    }
    Loc
        .findById(locationId)
        .select("reviews")
        .exec((err, location)=>{
            if(err){
                return res.status(400).json(err);
            } else if(!location){
                return res.status(404).json({message: "Location not found!"});
            }
            if(location.reviews && location.reviews.length>0){
                if(!location.reviews.id(reviewId)){
                    return res.status(404).json({message: "Review not found!"});
                }
                location.reviews.id(reviewId).remove();
                location.save(err =>{
                    if(err){
                        return res.status(404).json(err);
                    } else{
                        updateAverageRating(location._id);
                        return res.status(204).json(null);
                    }
                });
            } else{
                return res.status(404).json({message: "No review to delete"});
            }
        });
};

module.exports = {
    createReview,
    getReviewById,
    updateReviewById,
    deleteReviewById
}