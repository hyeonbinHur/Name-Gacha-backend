import express from 'express';
import dbClient from '../db/dbClient.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { access } from 'fs';

const router = express.Router();

const findUser = (userId) => {
    return new Promise((resolve, reject) => {
        dbClient.query(
            'SELECT * FROM public.user WHERE userId = $1',
            [userId],
            (err, queryRes) => {
                if (err) {
                    console.error(err);
                    reject('Failed to retrieve data');
                } else {
                    if (queryRes.rows.length > 0) {
                        resolve('User already exists');
                    } else {
                        resolve('Available ID');
                    }
                }
            }
        );
    });
};

//user sign up
router.post('/sign-up', (req, res) => {
    const { userId, userPassword } = req.body;
    const checkUser = findUser(userId);
    if (checkUser === 'Available ID') {
        const inputPassword = userPassword;
        const salt = crypto.randomBytes(128).toString('base64');
        const hashPassword = crypto
            .createHash('sha512')
            .update(inputPassword + salt)
            .digest('hex');
        const query = `INSERT INTO public.user ("userId", "userPassword", "salt") VALUES ($1, $2, $3) RETURNING *`;
        const values = [userId, hashPassword, salt];
        dbClient.query(query, values, (err, queryRes) => {
            if (err) {
                console.error(err.stack);
                res.status(500).send('Failed to insert data');
            } else {
                res.status(201).json(queryRes.rows[0]);
            }
        });
    } else {
        res.status(500).send('userId already exists');
    }
});

//user sign-in
router.get('/sign-in', async (req, res, next) => {
    const { userId, userPassword } = req.body;
    try {
        const query = 'SELECT * FROM public.user WHERE "userId" = $1';
        const { rows } = await dbClient.query(query, [userId]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = rows[0];
        const salt = user.salt;
        const hashPassword = crypto
            .createHash('sha512')
            .update(userPassword + salt)
            .digest('hex');

        if (hashPassword !== user.userPassword) {
            return res.status(401).send('Invalid password');
        } else {
            try {
                //access 토큰 발급
                const accessToken = jwt.sign(
                    {
                        id: user.userId,
                    },
                    process.env.ACCESS_SECRET,
                    {
                        expiresIn: '1m',
                        issuer: 'uncle.hb',
                    }
                );
                //refresh 토큰 발급
                const refreshToken = jwt(
                    {
                        id: user.userId,
                    },
                    process.env.REFRESH_SECRET,
                    {
                        expiresIn: '24h',
                        issuer: 'uncle.hb',
                    }
                );
                //토큰 전송
                res.cookie('accessToken', accessToken, {
                    secure: false,
                    httpOnly: true,
                });
                res.cookie('refreshToken', refreshToken, {
                    secure: false,
                    httpOnly: true,
                });
                res.status(200).send('Login successful');
                console.log(rows);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//get access token

//get refresh token

//login success?

//logout

/*
app.post('./login');
app.get('./accesstoken');
app.get('./refreshtoken');
app.get('./login/success');
app.post('./logout');
*/

export default router;
