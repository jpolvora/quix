import 'dotenv/config'
import express from 'express';
import httpProxy from 'express-http-proxy';

const app = express();
const port = process.env.PORT || 3000;

// app.use('*', (req, res, next) => {
//     console.log({ method: req.method, path: req.originalUrl })
//     return next()
// })

app.use('/api/v1/accounts', httpProxy(process.env.API_ACCOUNTS));
app.use('/api/v1/transactions', httpProxy(process.env.API_TRANSACTIONS));

app.get('/', (req, res) => {
    return res.send("Welcome to proxy").end();
});

app.listen(port, () => console.log(`Proxy listening on port ${port}!`));