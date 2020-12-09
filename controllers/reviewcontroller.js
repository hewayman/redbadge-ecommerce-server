const router = require('express').Router();
const Review = require('../db').import('../models/review');
const validateSession = require('../middleware/validate-session');

// router.get('/:id');

router.post('/create', validateSession, (req, res) => {
  const reviewsFromRequest = {
    rating: req.body.rating,
    review: req.body.review,
    date: req.body.date,
    userFirstName: req.user.firstName,
    userLastName: req.user.lastName,
    itemID: req.listing.id
  }

  Review.create(reviewsFromRequest)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: "Review not created" }))
})

module.exports = router;