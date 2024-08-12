const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models/index');

router.get('/register', async (req, res) => {
    res.render('register');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // console.log(req.body);

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please provide a username, email, and password' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        req.session.userId = user.id;
        req.session.user = user;
        req.session.loggedIn = true;

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;