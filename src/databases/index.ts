import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@/models/users/users.model';
import ActivityModel from '@/models/activities/activities.model';
import OpinionModel from '@/models/opinions/opinions.model';
import TypeModel from '@/models/types/types.model';
import NotificationModel from '@/models/notifications/notifications.model';
import User_ActivityModel from '@/models/associations/user_activity/user_activity.model';
import User_OpinionsModel from '@/models/associations/user_opinions/user_opinions.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

//sequelize.authenticate();
try {
  sequelize.authenticate();
  logger.info(`Connected to Database ${DB_HOST}`)
} catch (error) {
  console.error(`Unable to connect to the Database ${DB_HOST} :`, error)
}

const DB = {
  Users: UserModel(sequelize),
  Activities: ActivityModel(sequelize),
  Opinions: OpinionModel(sequelize),
  Types: TypeModel(sequelize),
  Notifications: NotificationModel(sequelize),
  User_Activity: User_ActivityModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

DB.Users.hasMany(DB.Opinions, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'opinions'
});
DB.Opinions.belongsTo(DB.Users, { targetKey: 'id' });

export default DB;

