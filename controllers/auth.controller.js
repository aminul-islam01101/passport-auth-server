const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');

const saltRounds = 10;

const register = async (req, res) => {
    const { email, password, userName } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist)
            return res.send({
                success: false,
                message: 'User already exist',
            });
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const newUser = new User({
                email,
                password: hash,
                userName,
            });
            await newUser
                .save()
                .then((user) => {
                    res.send({
                        success: true,
                        message: 'User is created Successfully',
                        user: {
                            id: user._id,
                            userName: user.userName,
                        },
                    });
                })
                .catch((error) => {
                    res.send({
                        success: false,
                        message: 'User is not created',
                        error,
                    });
                });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
        return res.send({
            success: false,
            message: 'User is not found',
        });
    }

    if (!bcrypt.compareSync(password, userExist.password)) {
        return res.send({
            success: false,
            message: 'Incorrect password',
        });
    }

    const payload = {
        id: userExist._id,
        email: userExist.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });

    return res.send({
        success: true,
        message: 'User is logged in successfully',
        token: `Bearer ${token}`,
    });
};

const user = (req, res) =>
    res.status(200).send({
        success: true,
        user: 
            req.user
            
        
    });

module.exports = {
    register,
    login,
    user,
};
