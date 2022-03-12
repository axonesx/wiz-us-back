import { hash } from 'bcrypt';
import DB_ACTIVITIES from '@databases';
import { CreateActivityDto } from '@dtos/activities.dto';
import { HttpException } from '@exceptions/HttpException';
import { Activity } from '@/models/activities/interface/activities.interface';
import { isEmpty } from '@utils/util';

class Activitieservice {
  public Activities = DB_ACTIVITIES.Activities;

  public async findAllActivity(): Promise<Activity[]> {
    const allActivity: Activity[] = await this.Activities.findAll();
    return allActivity;
  }

  public async findActivityById(ActivityId: number): Promise<Activity> {
    if (isEmpty(ActivityId)) throw new HttpException(400, "You're not ActivityId");

    const findActivity: Activity = await this.Activities.findByPk(ActivityId);
    if (!findActivity) throw new HttpException(409, "You're not Activity");

    return findActivity;
  }

  public async createActivity(ActivityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(ActivityData)) throw new HttpException(400, "You're not ActivityData");
    const createActivityData: Activity = await this.Activities.create({ ...ActivityData});
    return createActivityData;
  }

  public async updateActivity(ActivityId: number, ActivityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(ActivityData)) throw new HttpException(400, "You're not ActivityData");

    const findActivity: Activity = await this.Activities.findByPk(ActivityId);
    if (!findActivity) throw new HttpException(409, "You're not Activity");
    await this.Activities.update({ ...ActivityData}, { where: { id: ActivityId } });

    const updateActivity: Activity = await this.Activities.findByPk(ActivityId);
    return updateActivity;
  }

  public async deleteActivity(ActivityId: number): Promise<Activity> {
    if (isEmpty(ActivityId)) throw new HttpException(400, "You're not ActivityId");

    const findActivity: Activity = await this.Activities.findByPk(ActivityId);
    if (!findActivity) throw new HttpException(409, "You're not Activity");

    await this.Activities.destroy({ where: { id: ActivityId } });

    return findActivity;
  }
}

export default Activitieservice;
