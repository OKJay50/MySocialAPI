const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // Update a user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }

        // Remove user from their friends' friend lists
        User.updateMany(
          { _id: { $in: userData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            // Delete user's thoughts
            Thought.deleteMany({ username: userData.username }).then(() => {
              res.json({ message: 'User and associated data deleted' });
            });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
