
const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/register', (req, res) => {
    res.render('register');
});


router.get('/login', (req, res) => {
    res.render('login');
});


router.post(
    '/register',
    body('name').trim().isLength({ min: 2 }),
    body('number').trim().isLength({ min: 10 }),
    body('email').trim().isEmail(),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Invalid data',
                    errors: errors.array()
                });
            }

            const { name, number, email, password } = req.body;

            const normalizedEmail = email.toLowerCase();

            const existingUser = await userModel.findOne({
                email: normalizedEmail
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                name,
                number,
                email: normalizedEmail,
                password: hashedPassword
            });

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    number: newUser.number,
                    email: newUser.email
                }
            });

        } catch (error) {
            console.error('REGISTER ERROR:', error);

            return res.status(500).json({
                message: 'Registration failed',
                errorName: error.name,
                errorMessage: error.message
            });
        }
    }
);


router.post(
    '/login',
    body('name').trim().isLength({ min: 2 }),
    body('number').trim().isLength({ min: 10 }),
    body('email').trim().isEmail(),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Invalid data',
                    errors: errors.array()
                });
            }

            const { name, number, email, password } = req.body;

            const user = await userModel.findOne({
                email: email.toLowerCase()
            });

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }

            if (user.name.toLowerCase() !== name.toLowerCase()) {
                return res.status(400).json({
                    message: 'Name does not match'
                });
            }

            if (user.number !== number) {
                return res.status(400).json({
                    message: 'Phone number does not match'
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: 'Incorrect password'
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    name: user.name,
                    number: user.number,
                    email: user.email
                },
                process.env.JWT_SECRET
            );

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax'
            });

            return res.redirect('/home');

        } catch (error) {
            console.error('LOGIN ERROR:', error);

            return res.status(500).json({
                message: 'Login failed',
                errorName: error.name,
                errorMessage: error.message
            });
        }
    }
);


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/user/login');
});

module.exports = router;
