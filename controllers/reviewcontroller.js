const router = require('express').Router();
const Review = require('../db').import('../models/review');
const validateSession = require('../middleware/validate-session');

// get all reviews
router.get('/', (req, res) => {
  Review.findAll()
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Cannot find reviews."}))
})

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

// update reviews by id
router.put('/:id', validateSession, (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: "Update not successful"}))
});

// delete review
router.delete('/:id', validateSession, async (req, res) => {
  try {
      const result = await Review.destroy({
          where: { id: req.params.id }
      });

      res.status(200).json(result)
  } catch (err) {
      res.status(500).json({error: "Review not deleted"});
  }
})

// get reviews for each store item/listing
router.get('/item/:storeitemId', (req, res) => {
  Review.findAll({
    where: {
      storeitemId: req.params.storeitemId
    }
  })
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({error: "Reviews not found"}))
});

module.exports = router;