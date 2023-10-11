const { Reaction, Thought } = require('../models');

const reactionController = {
  // Create a reaction for a thought
  createReaction({ params, body }, res) {
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction by ID
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then((reactionData) => {
        if (!reactionData) {
          return res.status(404).json({ message: 'No reaction found with this ID' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionController;
