const express = require('express');

const jwt =require('jsonwebtoken');
const bcrypt =require ('bcrypt');

const routers = express.Router();
const pg = require('pg');

// const RouteGuard = require('../middleware/verifyToken');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

routers.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashpass = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, email, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, username, email, created_at`,
            [username, email, hashpass]
        );

        res.status(201).json({
            success: true,
            user: result.rows[0],
        });
    } 
    catch (error) {
        if (error.code === '23505') {
            if (error.detail.includes('username')) {
                return res.status(409).send("Username already exists");
            }
            if (error.detail.includes('email')) {
                return res.status(409).send("Email already exists");
            }
        }

        console.error(error); // For debugging
        res.status(500).send("Internal Server Error");
    }
});

routers.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = userResult.rows[0];
        if (!user) return res.status(401).send("Invalid email or password");
        // const user = userResult.rows[0];
console.log("User fetched from DB:", user);
if (!user) return res.status(401).send("Invalid email or password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid email or password");

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "2h" }
        );

        res.send({ token });
    } 
    catch (error) {
        console.error(error); // helpful for debugging
        res.status(500).send("Internal Server Error");
    }
});

module.exports = routers;