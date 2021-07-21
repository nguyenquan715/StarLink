const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const createReview = (req, res) => {
    
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
    
};

const deleteReviewById = (req, res) => {
    
};

module.exports = {
    createReview,
    getReviewById,
    updateReviewById,
    deleteReviewById
}