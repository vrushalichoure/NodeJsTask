import app from './routes/index';
import http from 'http';

http.createServer(app).listen(app.get('port'));

console.info(
    `app is running on port : ${app.get(
        'port'
    )}`
);