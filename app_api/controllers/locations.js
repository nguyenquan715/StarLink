const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const getListLocations = (req, res) => {
    Loc
        .find()
        .exec((err, locationList) => {
            if(err){
                return res.status(400).json(err);
            } else if(!locationList){
                return res.status(404).json({message: 'Locations not found!'});
            }
            res.status(200).json(locationList);
        });

};

const createLocation = (req, res) => {
    
};

const getLocationById = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .exec((err, location) => {
            if(!location){
                return res.status(404).json({message:"This location is not found!"});
            } else if(err){
                return res.status(404).json(err);
            }
            res.status(200).json(location);
        });
        
};

const updateLocationById = (req, res) => {
    
};

const deleteLocationById = (req, res) => {
    
};

module.exports = {
    getListLocations,
    createLocation,
    getLocationById,
    updateLocationById,
    deleteLocationById
}