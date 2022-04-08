import DB from '@databases'
import { CreateActivityDto } from '@dtos/activities.dto'
import { HttpException } from '@exceptions/HttpException'
import { Activity } from '@/models/activities/interface/activities.interface'
import { isEmpty } from '@utils/util'

class Activitieservice {
  public Activities = DB.Activities

  public async findAllActivity(): Promise<Activity[]> {
    const allActivity: Activity[] = await this.Activities.findAll()
    return allActivity
  }

  public async findActivityById(activityId: number): Promise<Activity> {
    if (isEmpty(activityId)) throw new HttpException(400, "You're not activityId")

    const findActivity: Activity = await this.Activities.findByPk(activityId)
    if (!findActivity) throw new HttpException(409, "You're not Activity")

    return findActivity
  }

  public async createActivity(ActivityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(ActivityData)) throw new HttpException(400, "You're not ActivityData")
    const createActivityData: Activity = await this.Activities.create({ ...ActivityData})
    return createActivityData
  }

  public async updateActivity(activityId: number, ActivityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(ActivityData)) throw new HttpException(400, "You're not ActivityData")

    const findActivity: Activity = await this.Activities.findByPk(activityId)
    if (!findActivity) throw new HttpException(409, "You're not Activity")
    await this.Activities.update({ ...ActivityData}, { where: { id: activityId } })

    const updateActivity: Activity = await this.Activities.findByPk(activityId)
    return updateActivity
  }

  public async deleteActivity(activityId: number): Promise<Activity> {
    if (isEmpty(activityId)) throw new HttpException(400, "You're not activityId")

    const findActivity: Activity = await this.Activities.findByPk(activityId)
    if (!findActivity) throw new HttpException(409, "You're not Activity")

    await this.Activities.destroy({ where: { id: activityId } })

    return findActivity
  }
}

export default Activitieservice
