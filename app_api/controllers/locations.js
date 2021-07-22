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
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ]
        },
        openingTimes: [
            {
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
             },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }
        ]},
        (err, location) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(location);
            }
        }
    );
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
    if (!req.params.locationId) {
        return res.status(404).json({message: "Not found, location id is required"});
    }
    Loc
        .findById(req.params.locationId)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location) {
                return res.status(404).json({message: "Location id not found"});
            } else if (err) {
                return res.status(400).json(err);
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }];
            location.save((err, loc) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json(loc);
            }
        });
    });
};

const deleteLocationById = (req, res) => {
    if(!req.params.locationId){
        return res.status(400).json("LocationId param is required!");
    }
    Loc
        .findByIdAndRemove(req.params.locationId)
        .exec((err, location)=>{
            if(err){
                return res.status(400).json(err);
            } 
            return res.status(204).json(null);
        });
};

module.exports = {
    getListLocations,
    createLocation,
    getLocationById,
    updateLocationById,
    deleteLocationById
}