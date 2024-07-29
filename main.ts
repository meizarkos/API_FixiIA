import express from "express";
import bodyParser from "body-parser";
import jwt from "jwt-express";
import { startOfDatabase } from "./src/utils";
import { errorHandler } from "./src/utils";
import { keyToken } from "./src/utils/data";
import * as routes from './src/routes';
import * as cruds from './src/models/crud';
import { patchRouteAdmin , patchByIdInToken } from './src/routes/crud';
import { deleteRouteAdmin, deleteByIdInToken} from './src/routes/crud';
import { createRouteAdmin , createRouteId } from './src/routes/crud';
import { getAllModelAdmin, getDetailModelAdmin, getByIdInToken } from './src/routes/crud';

startOfDatabase();

const app = express();

app.use(bodyParser.json());
app.use(
  jwt.init(keyToken, {
    cookies: false,
  }),
);

Object.keys(routes).forEach((key) => {
  routes[key](app);
});

Object.keys(cruds).forEach((key) => {
  patchRouteAdmin(app, cruds[key]);
  patchByIdInToken(app, cruds[key]);
  deleteRouteAdmin(app, cruds[key]);
  deleteByIdInToken(app, cruds[key]);
  createRouteAdmin(app, cruds[key]);
  createRouteId(app, cruds[key]);
  getAllModelAdmin(app, cruds[key]);
  getDetailModelAdmin(app, cruds[key]);
  getByIdInToken(app, cruds[key]);
});

app.get("/", (_req, res) => {
  res.json({ message: "The API is working"});
});

app.use((_req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use(errorHandler);

app.listen(3000,'127.0.0.1', () =>{ console.log(`Notre application Node est démarrée sur : https://helpother.fr ou http://localhost:3000`);});
