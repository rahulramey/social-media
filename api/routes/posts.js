const router = require("express").Router();
const Post =  require("../models/Post");
const User =  require("../models/User");

//create a post
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
        
    } catch (error) {
        return res.status(500).json(error)
    }
});

//update post
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.id === req.body.userId){
            await post.updateOne({$set:req.body});
            return res.status(200).json("Post has been updated!");
        }else{
            return res.status(403).json("You can only update your post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})

//delete post
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.id === req.body.userId){
            await post.deleteOne({$set:req.body});
            return res.status(200).json("Post has been deleted!");
        }else{
            return res.status(403).json("You can only delete your post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})

// like or dislike a post
router.put("/:id/like", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            return res.status(200).json("You liked this post!");
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}})
            return res.status(200).json("You disliked this post!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})

//get a post
router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
            return res.status(200).json(post);
        }
    catch (error) {
        return res.status(500).json(error);
    }
})

//get timeline posts
router.get("/timeline/:userId", async(req,res)=>{
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );``
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
      return res.status(500).json(error);
    }
})

module.exports = router;