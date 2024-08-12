const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    res.json('Comment route');
});

module.exports = router;