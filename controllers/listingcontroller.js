const router = require('express').Router();
const Listing = require('../db').import('../models/listing');
const validateSession = require('../middleware/validate-session');
const {Op} = require('sequelize');

// get all item listings
router.get('/', (req, res) => {
  Listing.findAll()
    .then(listing => res.status(200).json(listing))
    .catch(err => res.status(500).json({ error: 'Cannot retrieve listings' }))
});

// get item by id
router.get('/:id', (req, res) => {
  Listing.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(listing => res.status(200).json(listing))
  .catch(err => res.status(500).json({ error: "Item not found" }))
})

// create item listings (admin only)
router.post('/create', validateSession, (req, res) => {
  const listingFromRequest = {
    itemName: req.body.itemName,
    color: req.body.color,
    description: req.body.description,
    price: req.body.price,
    itemNum: req.body.itemNum
    // ,
    // owner: req.user.id
  }

  Listing.create(listingFromRequest)
    .then(listing => res.status(200).json(listing))
    .catch(err => res.status(500).json({ error: "Listing not created "}))
});

// get listings by item name (partial names allowed)
router.get('/name/:itemName', (req, res) => {
  Listing.findAll({
    where: {
      itemName: {
        [Op.iLike]: '%' + req.params.itemName + '%'
      }
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Item not found"}))
});

// get listings by color
router.get('/color/:color', (req, res) => {
  Listing.findAll({
    where: {
      color: {
        [Op.iLike]: '%' + req.params.color + '%'
      }
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Item not found"}))
});

// get listings by item number
router.get('/item/:itemNum', (req, res) => {
  Listing.findAll({
    where: {
      itemNum: req.params.itemNum
    }
  })
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).json({error: "Item not found"}))
});

// update listing (admin only)
router.put('/:id', validateSession, (req, res) => {
  Listing.update(req.body, {
    where: { id: req.params.id }
  })
  .then(listing => res.status(200).json(listing))
  .catch(err => res.status(500).json({ error: "Update not successful" }))
});

// delete listing (admin only)
router.delete('/:id', validateSession, async(req, res) => {
  try {
    const result = await Listing.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Listing not deleted"});
  }
});

module.exports = router;