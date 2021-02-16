//const express = require('express');
import express from 'express';
import morgan from 'morgan';
import hbs from 'express-handlebars';
import path from 'path';

import index from './routes/index.routes';

import tasks from './routes/tasks.routes';

class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', hbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(index);
        this.app.use('/tasks', tasks);
        this.app.use(express.static(path.join(__dirname, 'public')));

    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server running on port ${this.app.get('port')}`);
        });
    }
}

export default Application;