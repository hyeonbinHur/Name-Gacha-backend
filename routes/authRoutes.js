import express from 'express';
import dbClient from '../db/dbClient.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

const findUser = (userId) => {
    return new Promise((resolve, reject) => {
        dbClient.query(
            'SELECT * FROM public.user WHERE "userId" = $1',
            [userId],
            (err, queryRes) => {
                if (err) {
                    console.error(err);
                    reject('Failed to retrieve data');
                } else {
                    if (queryRes.rows.length > 0) {
                        resolve(queryRes.rows);
                    } else {
                        resolve('Available ID');
                    }
                }
            }
        );
    });
};

//user sign up
router.post('/sign-up', async (req, res) => {
    const { userId, userPassword } = req.body;
    const checkUser = await findUser(userId);
    if (checkUser == 'Available ID') {
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
router.post('/sign-in', async (req, res) => {
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
            const accessToken = jwt.sign(
                { uuid: user.uuid },
                process.env.ACCESS_SECRET,
                { expiresIn: '1m', issuer: 'uncle.hb' }
            );

            const refreshToken = jwt.sign(
                { uuid: user.uuid },
                process.env.REFRESH_SECRET,
                { expiresIn: '24h', issuer: 'uncle.hb' }
            );
            res.cookie('accessToken', accessToken, {
                secure: false,
                httpOnly: true,
            });
            res.cookie('refreshToken', refreshToken, {
                secure: false,
                httpOnly: true,
            });
            res.status(200).send('Login successful');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//get access token
router.post('/accesstoken', async (req, res) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).send('Access token missing');
    } else {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            res.status(200).send(decoded);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.status(401).send('Refresh token expired');
            } else if (err instanceof jwt.JsonWebTokenError) {
                res.status(401).send('Invalid refresh token');
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
});

//refresh 토큰 갱신
router.post('/refreshtoken', async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).send('Refresh token missing');
    } else {
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_SECRET
            );
            const accessToken = jwt.sign(
                { uuid: decoded.uuid },
                process.env.ACCESS_SECRET,
                { expiresIn: '24h', issuer: 'uncle.hb' }
            );
            res.cookie('accessToken', accessToken, {
                secure: false,
                httpOnly: true,
            });
            res.status(200).send(decoded);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.status(401).send('Refresh token expired');
            } else if (err instanceof jwt.JsonWebTokenError) {
                res.status(401).send('Invalid refresh token');
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
});

//login success?
router.post('./login-check', async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const userId = data.userId;
        const userData = findUser(userId);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//logout
router.post('/sign-out', async (req, res) => {
    try {
        res.cookie('accessToken', '');
        res.status(200).json('Logout Sucess');
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user data
router.get('/user/:id', async (req, res) => {
    const uuid = req.params.id;
    const query = 'SELECT * FROM public.user WHERE "uuid" = $1';
    dbClient.query(query, [uuid], (err, queryRes) => {
        if (err) {
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows[0]);
        }
    });
});

/*
app.post('./login');
app.get('./accesstoken');
app.get('./refreshtoken');
app.get('./login/success');
app.post('./logout');
*/

export default router;
