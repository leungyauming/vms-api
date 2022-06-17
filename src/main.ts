import express from 'express';

const app = express();

const prod = process.env.NODE_ENV === 'production';

const host = process.env.VMS_HOST || (prod ? '0.0.0.0' : '127.0.0.1');
const port = process.env.VMS_PORT || (prod ? 80 : 8080);
console.log(`API will be listening on ${host}:${port}`);

app.listen(+port, host);
