import DB from '@databases'
import { CreateActivityDto } from '@dtos/activities.dto'
import { HttpException } from '@exceptions/HttpException'
import { Activity } from '@/models/activities/interface/activities.interface'
import { isEmpty } from '@utils/util'

class ActivitieService {
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

  public async createActivity(activityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(activityData)) throw new HttpException(400, "You're not ActivityData")
    const createActivityData: Activity = await this.Activities.create({ ...activityData})
    return createActivityData
  }

  public async updateActivity(activityId: number, activityData: CreateActivityDto): Promise<Activity> {
    if (isEmpty(activityData)) throw new HttpException(400, "You're not ActivityData")

    const findActivity: Activity = await this.Activities.findByPk(activityId)
    if (!findActivity) throw new HttpException(409, "You're not Activity")
    await this.Activities.update({ ...activityData}, { where: { id: activityId } })

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

export default ActivitieService
