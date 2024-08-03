import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';

async function getDetailModelAdmin(res: Response, req : Request , config: CrudAdmin) {
    if(config.get !== undefined && config.get === null){
        res.status(500).json({ error: "Error in the server", message: 'You aren t suppose to use this model like this' });
        return;
    }
    try {
        if(config.get !== undefined && config.get === false){
            res.status(500).json({ error: "Error in the server", message: 'You aren t suppose to use this model like this' });
            return;
        }

        const item = await config.model.findByPk(req.params.uuid);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return;
        }

        res.status(200).json({ message: `Item found in ${config.route}`, item });
    } catch (e: unknown) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: `Error fetching item from ${config.route}`
        });
    }
}

async function getAllModelAdmin(req :Request, res: Response, config: CrudAdmin){
    if(config.get !== undefined && config.get === null){
        res.status(500).json({ error: "Error in the server", message: 'You aren t suppose to use this model like this' });
        return;
    }
    try {
        if(config.get !== undefined && config.get === false){
            res.status(500).json({ error: "Error in the server", message: 'You aren t suppose to use this model like this' });
            return;
        }
        const items = await config.model.findAll(
            config.noReturn ? { attributes: { exclude: config.noReturn } } : {}
        );

        if (!items) {
            res.status(404).json({ message: `No items found in ${config.route}` });
            return;
        }

        res.status(200).json({ message: `All items in ${config.route}`, items });
    } catch (e: unknown) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: `Error fetching items from ${config.route}`
        });
    }
};

export const getCrudAllModelAdmin = (app: Application, config: CrudAdmin) => {
    app.get(config.route, async (req: Request, res: Response) => {
        getAllModelAdmin(req,res,config)
    });
};

export const getCrudDetailModelAdmin = (app: Application, config: CrudAdmin) => {
    app.get(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        getDetailModelAdmin(res,req,config)
    });
};

export const getCrudAllModelUser = (app: Application, config: CrudAdmin) => {
    app.get(`${config.route}_user`, async (req: Request, res: Response) => {
        getAllModelAdmin(req,res,config)
    });
}

export const getCrudDetailModelUser = (app: Application, config: CrudAdmin) => {
    app.get(`${config.route}_user/:uuid`, async (req: Request, res: Response) => {
        getDetailModelAdmin(res,req,config)
    });
};

export const getCrudByIdInToken = (app: Application, config: CrudAdmin) => {
  app.get(`${config.route}_token`, async (req: Request, res: Response) => {
      try {
          if(!req.jwt.payload.id){
              res.status(401).json({ message: `Token not found in ${config.route}token` });
              return;
          }

          if(config.champNameToFindById == null || config.champNameToFindById == undefined){
              res.status(500).json({
                  error: 'Internal Server Error',
                  message: `You forgot to modify the model to add champNameToFindById`
              });
              return;
          }

          const champAsPrimaryKey = config.champNameToFindById;

          const whereClause = {};
          whereClause[champAsPrimaryKey] = req.jwt.payload.id; //user_id : req.jwt.payload.id

          const item = await config.model.findAll({where:whereClause});

          if (!item) {
              res.status(404).json({ message: `Item not found in ${config.route}` });
              return;
          }

          res.status(200).json({ message: `Item found in ${config.route}`, item });
      } catch (e: unknown) {
          console.log(e);
          res.status(500).json({
              error: 'Internal Server Error',
              message: `Error fetching item from ${config.route}`
          });
      }
  });
}
