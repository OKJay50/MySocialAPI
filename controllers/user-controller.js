const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({})
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .select('-__v');
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  getUserById: async ({ params }, res) => {
    try {
      const userData = await User.findOne({ _id: params.id })
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .select('-__v');
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  createUser: async ({ body }, res) => {
    try {
      const userData = await User.create(body);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by ID
  updateUser: async ({ params, body }, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by ID
  deleteUser: async ({ params }, res) => {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id });
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      await User.updateMany(
        { _id: { $in: userData.friends } },
        { $pull: { friends: params.id } }
      );

      await Thought.deleteMany({ username: userData.username });

      res.json({ message: 'User and associated data deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a new friend to a user's friend list
  addFriend: async ({ params }, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  removeFriend: async ({ params }, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
