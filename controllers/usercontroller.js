const router = require('express').Router();
const User = require('../db').import('../models/user');
const Review = require('../db').import('../models/review');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

// create user account
router.post('/register', (req, res) =>{
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin,
  })
  .then(user => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d'});

    res.status(200).json({
      user: user,
      message: 'user created successfully',
      sessionToken: token
    });
  })
  .catch(err => res.status(500).json({ error: err }));
})

router.post('/admin', (req, res) =>{
  User.create({ 
    email: process.env.ADMIN_EMAIL, 
    password: bcrypt.hashSync(process.env.ADMIN_PASS, 12), 
    isAdmin: true 
  })
  .then(user => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d'});

    res.status(200).json({
      user: user,
      message: 'Admin created successfully',
      sessionToken: token
    });
  })
  .catch(err => res.status(500).json({ error: 'Admin account not created' }))
})

router.get('/all', (req, res) => {
  User.findAll({ include: [{ model: Review, as: 'userReview'}] })
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({error: 'Cannot display users'}))
})

router.get('/:id', (req, res) => {
  User.findOne({ include: [{ model: Review, as: 'userReview'}], where: { id: req.params.id } })
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({error: 'Cannot display users'}))
})

// update user details (address, phone info)
router.put('/details', validateSession, (req, res) => {
  User.update(req.body, { 
    where: {
      email: req.body.email 
    }
  })
  .then(user => res.status(200).json({user}))
  .catch(err => res.status(500).json({ error: 'Update not successful' }))
})

// delete user account (admin only)
router.delete('/:id', validateSession, async (req, res) => {
  try { 
    const result = await User.destroy({
      where: {
        id: req.params.id
        // email: req.body.email
      }
    });

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: 'User information not deleted '});
  }
})

// login to user account
router.post('/login', (req, res) => {
  User.findOne({ where: { email: req.body.email }})
  .then(user => {
      if (user) {
          bcrypt.compare(req.body.password, user.password, (err, matches) => {
              if (matches) {
                  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d"});

                  res.status(200).json({
                      user: user,
                      message: "user login successful",
                      sessionToken: token
                  })

              } else {
                  res.status(500).json({ error: "incorrect password" })
              }
          })


      } else {
          res.status(500).json({ error: "user does not exist" })
      }
  })
  .catch(err => res.status(500).json({ error: "database error" }));
});

module.exports = router;