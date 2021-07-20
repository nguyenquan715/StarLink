/* GET about page */
const about = (req, res) => {
    res.render('about', { title: 'StarLink - About' });
};

module.exports = {
    about
};