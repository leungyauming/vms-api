import express from 'express';
import winston from 'winston';
import logform from 'logform';

const prod = process.env.NODE_ENV === 'production';

winston.configure({
  format: logform.format.combine(
    logform.format.colorize({ level: true }),
    logform.format.simple(),
  ),
  transports: [
    new winston.transports.Console({ level: prod ? 'info' : 'debug' }),
  ],
});

winston.info(`Application running in ${process.env.NODE_ENV || 'development'} mode.`);

const app = express();

const host = process.env.VMS_HOST || (prod ? '0.0.0.0' : '127.0.0.1');
const port = process.env.VMS_PORT || (prod ? 80 : 8080);

app.listen(+port, host, () => {
  winston.info(`HTTP server listening on http://${host}:${port}.`);
});
