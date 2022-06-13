const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest': 'uploads/'})
const { asyncErrorHandler, isLoggedIn, isAuthor } = require('../middleware');
const {
  getPosts,
  newPost,
  createPost,
  showPost,
  postEdit,
  postUpdate,
  destroyPost
} = require('../controllers/posts');

/* GET post page /posts. */
router.get('/', asyncErrorHandler(getPosts));

// GET posts index /posts/new
router.get('/new',isLoggedIn, newPost);  //isLoggerIn

// POST posts create /posts 
router.post('/',isLoggedIn, upload.array('images', 20), asyncErrorHandler(createPost));

// GET posts show /posts/:id
router.get('/:id', asyncErrorHandler(showPost));  //isLoggerIn 

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit',isLoggedIn, asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id',upload.array('images', 20), asyncErrorHandler(postUpdate));

/*DELETE the document /posts/:id*/
router.delete('/:id',isLoggedIn, asyncErrorHandler(isAuthor), asyncErrorHandler(destroyPost));


module.exports = router;