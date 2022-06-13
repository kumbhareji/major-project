const express = require('express');
const router = express.Router();
const {
  aboutUs,
  landingPage,
  getRegister,
  getLogin,
  postRegister, 
  postLogin, 
  getLogout} = require('../controllers/index');
const { asyncErrorHandler} = require('../middleware/index');

/* AboutUs page */
router.get('/aboutUs', aboutUs)

/* GET home page. */
router.get('/', landingPage);

/* GET /register. */
router.get('/register', getRegister);

/* POST /register. */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login. */
router.get('/login', getLogin);

/* POST /login. */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout);

/* GET /forgot-password. */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot');
});

/* PUT /forgot-password. */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot');
});

/* GET /reset-password. */
router.get('/reset-pw/:token', (req, res, next) => {
  res.send('GET /reset-pw/:token');
});

/* PUT /reset-password. */
router.put('/rest-pw/:token', (req, res, next) => {
  res.send('PUT /reset-pw/:token');
});

module.exports = router;