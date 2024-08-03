import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jwt-express';
import { startOfDatabase } from './src/utils';
import { errorHandler } from './src/utils';
import { keyToken } from './src/utils/data';
import * as routes from './src/routes';
import * as cruds from './src/models/crud';
import { patchCrudAdmin } from './src/routes/crud';
import { deleteCrudAdmin } from './src/routes/crud';
import { createCrudAdmin } from './src/routes/crud';
import { getCrudAllModelAdmin, getCrudDetailModelAdmin } from './src/routes/crud';

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
