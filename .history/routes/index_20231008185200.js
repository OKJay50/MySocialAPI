const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');
const reactionRoutes = require('./reactions');

// Prefix routes with their respective endpoints
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/:thoughtId/reactions', reactionRoutes);

module.exports = router;
