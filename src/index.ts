// dotenv
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// cors
app.use(
    cors({
        credentials: true
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());



// start server
const port = process.env.SERVER_PORT;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// database
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL ?? "");
mongoose.connection.on("error", (error: Error) => console.log(error));