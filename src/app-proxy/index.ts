import 'dotenv/config'
import express from 'express';
import httpProxy from 'express-http-proxy';

const app = express();
const port = 3000;

app.use('*', (req, res, next) => {
    console.log({ method: req.method, path: req.originalUrl })
    return next()
})

app.get('/', (req, res) => {
    return res.send("Welcome to proxy").end();
});

app.use('/api/accounts', httpProxy(process.env.API_ACCOUNTS));
app.use('/api/transactions', httpProxy(process.env.API_TRANSACTIONS));

app.listen(port, () => console.log(`Proxy listening on port ${port}!`));