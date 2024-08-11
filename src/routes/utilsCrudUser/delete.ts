import { Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { Identifier } from 'sequelize';

export async function deleteFunc(res: Response, config: CrudAdmin, id: Identifier) {
    if (config.delete !== undefined && config.delete === false) {
        res.status(500).json({
            error: 'Error in the server',
            message: 'You aren t suppose to use this model like this'
        });
        return;
    }

    try {
        const item = await config.model.findByPk(id);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return;
        }

        await config.model.destroy({ where: { uuid: id } });
        res.status(200).json({ message: `Item deleted from ${config.route}` });
    } catch (e: unknown) {
        console.error(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error deleting item.' });
    }
}

export async function deleteFuncId(res: Response, config: CrudAdmin, id: Identifier) {
    if (config.delete !== undefined && config.delete === false) {
        res.status(500).json({
            error: 'Error in the server',
            message: 'You aren t suppose to use this model like this'
        });
        return 1;
    }

    try {
        const item = await config.model.findByPk(id);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return 1;
        }

        await config.model.destroy({ where: { uuid: id } });
        return 0;
    } catch (e: unknown) {
        console.error(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error deleting item.' });
        return 1;
    }
}


