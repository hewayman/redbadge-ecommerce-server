const router = require('express').Router();
const Review = require('../db').import('../models/review');
const validateSession = require('../middleware/validate-session');

// create reviews
router.post('/create', validateSession, (req, res) => {
  const reviewsFromRequest = {
    rating: req.body.rating,
    review: req.body.review,
    date: req.body.date,
    userId: req.user.id
    // ,
    // userFirstName: req.user.firstName,
    // userLastName: req.user.lastName,
    // itemID: req.listing.id,
    // owner: req.user.id
    // itemID: req.listing.id
  }

  Review.create(reviewsFromRequest)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: "Review not created" }))
})

// // get reviews
// router.get('/getreview', (req, res) => {
//   Review.findAll({
//     where: {
//       userId: req.user.id
//     },
//     include: 'user'
//   })
//     .then(function createSuccess(data) {
//       res.status(200).json({
//         message: 'User info found',
//         data: data
//       })
//     })
//     .catch(err => res.status(500).json('User info not found', err))
// });

module.exports = router;