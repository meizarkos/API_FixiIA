import { Company, User } from '../../models';
import { Application, Request, Response } from 'express';
import { Model, ModelStatic } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginError } from '../../messages';
import { keyToken } from '../../utils/data';

/* eslint-disable */
async function login(req: Request, res: Response, model: ModelStatic<Model<any, any>>) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            res.status(401).send({ message: loginError.wrong_credentials });
            return;
        }

        const valeur = await model.findOne({ where: { email } });

        if (!valeur) {
            res.status(401).send({ message: loginError.wrong_credentials });
            return;
        }

        if (!valeur || !(await bcrypt.compare(password, valeur.getDataValue('password')))) {
            return res.status(401).json({ message: loginError.wrong_credentials });
        }
        const token = jwt.sign({ id : valeur.getDataValue('uuid') }, keyToken, { expiresIn: '1h' })
        res.status(200).send({ message: 'Connecté', token: token });
    } catch (e: unknown) {
        console.log(e);
        res.status(500).send({ error: 'Internal server error' });
    }
}

export const loginUser = (app: Application) => {
    app.post('/loginUser', async (req: Request, res: Response) => {
        login(req, res, User);
    });
};

export const loginCompany = (app: Application) => {
    app.post('/loginCompany', async (req: Request, res: Response) => {
        login(req, res, Company);
    });
};
