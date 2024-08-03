import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jwt-express';
import { startOfDatabase } from './utils';
import { errorHandler } from './utils';
import { keyToken } from './utils/data';
import * as routes from './routes';
import * as cruds from './models/crud';
import { patchCrudAdmin } from './routes/crud';
import { deleteCrudAdmin } from './routes/crud';
import { createCrudAdmin } from './routes/crud';
import { getCrudAllModelAdmin, getCrudDetailModelAdmin } from './routes/crud';

startOfDatabase();

const app = express();

app.use(bodyParser.json());
app.use(
    jwt.init(keyToken, {
        cookies: false
    })
);

Object.keys(routes).forEach((key) => {
    routes[key](app);
});

Object.keys(cruds).forEach((key) => {
    patchCrudAdmin(app, cruds[key]);
    deleteCrudAdmin(app, cruds[key]);
    createCrudAdmin(app, cruds[key]);
    getCrudAllModelAdmin(app, cruds[key]);
    getCrudDetailModelAdmin(app, cruds[key]);
});

app.get('/', (_req, res) => {
    res.json({ message: 'The API is working' });
});

app.use((_req, res) => {
    res.status(404).json({ message: 'This route does not exist' });
});

app.use(errorHandler);

app.listen(3000, '127.0.0.1', () => {
    console.log(`Notre application Node est démarrée sur : https://helpother.fr ou http://localhost:3000`);
});
