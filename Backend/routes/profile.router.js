const express = require("express")
const {User} = require("../models/User.model")
const { authenticate } = require("../middleware/authentication.middleware")

const profileRouter=express.Router()

profileRouter.get('/profile', authenticate, async (req, res) => {
    try {  
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
     const userProfile = {
        username: user.username,
        email: user.email,
        profile: user.profile,
      };

      res.status(200).json({ user: userProfile });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

profileRouter.get('/settings', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const userSettings = {
        username: user.username,
        email: user.email,
        profile: user.profile,
      };
      res.status(200).json({ user: userSettings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

profileRouter.put('/profile', authenticate, async (req, res) => {
    try {
      const userId = req.user; 
      const { name, profilepicture, gender } = req.body; 
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'profile.name': name,
            'profile.profilepicture': profilepicture,
            'profile.gender': gender,
          },
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const userSettings = {
        username: updatedUser.username,
        email: updatedUser.email,
        profile: updatedUser.profile,
      };
  
      res.status(200).json({ message: 'Profile updated successfully', user: userSettings });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports={
    profileRouter
}
