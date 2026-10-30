
const express = require('express');
const router = express.Router();

const File = require('../models/file.model');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/home', authMiddleware, async (req, res) => {
    try {
        const files = await File.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.render('home', {
            files: files,
            user: req.user
        });

    } catch (error) {
        console.log('HOME ROUTE ERROR:', error);
        res.status(500).send('Unable to load dashboard');
    }
});

module.exports = router;