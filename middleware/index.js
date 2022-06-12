const User = require('../models/user');
const Post = require('../models/post');

module.exports = {
    asyncErrorHandler: (fn) => 
        (req,res,next) => {
            Promise.resolve(fn(req, res, next))
                    .catch(next);
        }
    ,
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) return next();
        req.session.error = "You need to be logged in to do that!";
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    },
    isAuthor: async (req, res,  next) => {
        const post = await Post.findById(req.params.id);
        if (post.author.equals(req.user._id)){
            res.locals.post = post;
            return next();
        }
        req.session.error = 'Access denied';
        res.redirect('back');
    }
}