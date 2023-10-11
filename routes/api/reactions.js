const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reaction-controller');

// Define routes for /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
