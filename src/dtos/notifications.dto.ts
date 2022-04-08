import { IsString } from 'class-validator'

export class CreateNotificationDto {

  @IsString()
  public title: string

  @IsString()
  public message: string

}
