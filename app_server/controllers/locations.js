/* GET 'Home' page */
const homeList = (req, res) => {
    let data = {
        title: 'StarLink - Find a place to work with wifi',
        header: {
            title: 'StarLink',
            description: 'Find places to work with wifi near you!'
        },
        locations: [
            {
                name: 'Star Coffee',
                rating: 3,
                address: '125 Paker Street, City Center, London',
                distance: '100m',
                facilities: ['Hot drinks', 'Food', 'Premium wifi']
            },
            {
                name: 'Cafe Hero',
                rating: 4,
                address: '85 Capider Street, Long Park, London',
                distance: '200m',
                facilities: ['Hot drinks', 'Food', 'Premium wifi']
            },
            {
                name: 'Burger Queen',
                rating: 2,
                address: '144 Queen Street, Spring River, London',
                distance: '250m',
                facilities: ['Food', 'Premium wifi']
            },
        ]
    };
    res.render('locations-list', data);
};

/* GET 'Location info' page */
const locationInfo = (req, res) => {
    let data = {
        title: 'StarLink - Location information',
        location: {
            name: 'Star Coffee',
            address: '125 Paker Street, City Center, London',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            mapUrl: '/images/map.jpeg',
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00 AM',
                    closing: '7:00 PM',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '8:00 AM',
                    closing: '5:00 PM',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Simon Holmes',
                    rating: 5,
                    timestamp: '16 July 2013',
                    reviewText: 'What a great place. I can\'t say enough good things about it.'
                },
                {
                    author: 'Charlie Chaplin',
                    rating: 3,
                    timestamp: '16 June 2013',
                    reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
                }
            ]
        }
    };
    res.render('location-info', data);
};

/* GET 'Add review' page */
const addReview = (req, res) => {
    let data = {
        title: 'StarLink - Review location',
        header: {
            title: 'Review Star Coffee'
        }
    };
    res.render('location-review-form', data);
};

module.exports = {
    homeList,
    locationInfo,
    addReview
};