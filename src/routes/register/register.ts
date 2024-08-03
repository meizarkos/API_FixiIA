import { User, Company } from '../../models';
import { Application, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { getAllErrors } from '../../utils';
import { Model, ModelStatic } from 'sequelize';

/* eslint-disable */
async function register(req: Request, res: Response, model: ModelStatic<Model<any, any>>) {
    try {
        if (!req.body.email || !req.body.password) {
            await model.create(req.body);
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        await model.create(req.body);

        const valeur = await model.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ['password'] }
        });

        const token = res.jwt({ id: valeur.getDataValue('uuid') });
        res.status(200).send({ message: 'Créer', token: token.token });
    } catch (e: unknown) {
        const attributes = Object.keys(model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: 'Error in the server', message: 'Error creating new item.' });
    }
}

export const registerUser = (app: Application) => {
    app.post('/registerUser', async (req: Request, res: Response) => {
        register(req, res, User);
    });
};

export const registerCompany = (app: Application) => {
    app.post('/registerCompany', async (req: Request, res: Response) => {
        register(req, res, Company);
    });
};
