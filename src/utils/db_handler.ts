import { Sequelize } from 'sequelize';
import { hostDb, passwordDb, userDb } from './data';

export const sequelize = new Sequelize(hostDb, userDb, passwordDb, {
    host: '127.0.0.1',
    dialect: 'mariadb',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    dialectOptions: {
        timezone: 'Etc/GMT+2'
    },
    logging: false
});

export const startOfDatabase = async () => {
    sequelize
        .sync({})
        .then(() => {
            console.log('Database and tables have been synchronized');
        })
        .catch((err) => {
            console.error('An error occurred while synchronizing the database:', err);
        });
};
