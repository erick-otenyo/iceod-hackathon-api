import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

app.set("json spaces", 4);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

initializeDb(cloudant => {

    // api router
    app.get('/', (req, res) => {
		res.json({message:"Welcome to the iCEOD Hackathon API"})
	});

    app.use('/api', api({ config, cloudant }));

    app.get('*', function (req, res) {
        const error_message = {
            "error": "not found",
            "message": "invalid resource URL",
            "status": 404
        }
        res.json(error_message);
    });

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
});

export default app;