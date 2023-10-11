const { Thought } = require('../models');

const reactionController = {
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

module.exports = reactionController;
