const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dimsl4qz3',
    api_key: '541164471844439',
    api_secret: process.env.CLOUDIANRY_SECRET
})

module.exports = {
    //Post Index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts })
    },
    //Post New
    newPost(req, res, next) {
        res.render('posts/new');
    },
    /*Posts Create */
    async createPost(req, res, next){
        req.body.post.images = [];
        for(const file of req.files){
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let post = await Post.create(req.body.post);
        // req.body.post.author = req.user._id;
        // post.save();
        // req.session.success = 'Document created successfully!'
        res.redirect(`/posts/${post.id}`);
    },
    /* POST Show */
    async showPost(req, res, next) {
        let post = await Post.findById( req.params.id);
        res.render('posts/show', { post });
    },
    // Posts Edit
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/edit', { post });
	},
	// Posts Update
	async postUpdate(req, res, next) {
		let post = await Post.findById(req.params.id);

        if(req.body.deleteImages && req.body.deleteImages.length){
            let deleteImages = req.body.deleteImages;
            for (const public_id of deleteImages){
                let image = await cloudinary.v2.uploader.destroy(public_id);
                for(const image of post.image){
                    if(image.public_id === public_id){
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        if(req.files) {
            for(const file of req.files){
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.to = req.body.post.to;

        post.save();
		res.redirect(`/posts/${post.id}`);
	},
    async destroyPost(req, res, next){
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    }
}