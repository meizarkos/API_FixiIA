import { User } from '../../models';
import { Application, Request, Response } from 'express';
import { Model, ModelStatic } from 'sequelize';
import bcrypt from 'bcrypt';
import { loginError } from '../../messages';


async function login(req:Request,res:Response,model :ModelStatic<Model<any, any>> ){
        const email = req.body.email;
        const password = req.body.password;
        try {
            if(!email || !password){
                res.status(401).send({ message: loginError.wrong_credentials });
                return;
            }
            const valeur = await model.findOne({where:{ email }});

            if (!valeur) {
                res.status(401).send({ message: loginError.wrong_credentials });
                return;
            }

            if (!valeur || !(await bcrypt.compare(password, valeur.getDataValue('password')))) {
                return res.status(401).json({ message: loginError.wrong_credentials });
            }

            const token = res.jwt({id: valeur.getDataValue('uuid')})
            res.status(200).send({ message: "Connecté", token:token.token});
        } catch (e: unknown) {
            res.status(500).send({ error: "Internal server error"});
        }
}

export const loginUser = (app: Application) => {
  app.post('/loginUser', async (req: Request, res: Response) => {
      login(req,res,User)
  });
};
