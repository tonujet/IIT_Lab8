import express from 'express';
import {server} from './config.js';
import {register} from './metrics.js';
import {logger} from './logger.js';

const app = express();


app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        await logger.emit("error", {error});
        res.status(500).end('Something went wrong');
    }

});


const startServer = () => new Promise( (res, rej) => {
    const port = server.port;
    app.listen(port, async (error) => {
        if (error) {
            await logger.emit("error", {error});
            rej(error);
        } else {
            console.log(`Web server is started on port: ${port}`);
            res(server);
        }
    });
});


export default startServer;


