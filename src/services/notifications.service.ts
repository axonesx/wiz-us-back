import DB from '@databases';
import { CreateNotificationDto } from '@dtos/notifications.dto';
import { HttpException } from '@exceptions/HttpException';
import { Notification } from '@/models/notifications/interface/notifications.interface';
import { isEmpty } from '@utils/util';

class NotificationService {
  public Notifications = DB.Notifications;

  public async findAllNotification(): Promise<Notification[]> {
    const allNotification: Notification[] = await this.Notifications.findAll();
    return allNotification;
  }

  public async findNotificationById(notificationId: number): Promise<Notification> {
    if (isEmpty(notificationId)) throw new HttpException(400, "You're not notificationId");

    const findNotification: Notification = await this.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "You're not Notification");

    return findNotification;
  }

  public async createNotification(notificationData: CreateNotificationDto): Promise<Notification> {
    if (isEmpty(notificationData)) throw new HttpException(400, "You're not notificationData");
    const createnotificationData: Notification = await this.Notifications.create({ ...notificationData});
    return createnotificationData;
  }

  public async updateNotification(notificationId: number, notificationData: CreateNotificationDto): Promise<Notification> {
    if (isEmpty(notificationData)) throw new HttpException(400, "You're not notificationData");

    const findNotification: Notification = await this.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "You're not a Notification");
    await this.Notifications.update({ ...notificationData}, { where: { id: notificationId } });

    const updateNotification: Notification = await this.Notifications.findByPk(notificationId);
    return updateNotification;
  }

  public async deleteNotification(notificationId: number): Promise<Notification> {
    if (isEmpty(notificationId)) throw new HttpException(400, "You're not notificationId");

    const findNotification: Notification = await this.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "You're not a Notification");

    await this.Notifications.destroy({ where: { id: notificationId } });

    return findNotification;
  }
}

export default NotificationService;
