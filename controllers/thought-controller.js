const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        )
          .then((userData) => {
            if (!userData) {
              return res.status(404).json({ message: 'No user found with this ID' });
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        // Remove thought from user's thoughts array
        User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: params.id } }
        )
          .then(() => {
            res.json({ message: 'Thought and associated data deleted' });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
