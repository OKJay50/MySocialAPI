const router = require('express').Router();
const userRoutes = require('./api/users');
const thoughtRoutes = require('./api/thoughts');
const reactionRoutes = require('./api/reactions');

// Prefix routes with their respective endpoints
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/:thoughtId/reactions', reactionRoutes);

module.exports = router;
