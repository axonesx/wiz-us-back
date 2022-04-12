import { IsString, IsEmail, IsNumber, IsDate } from 'class-validator'

export class CreateActivityDto {
  @IsEmail()
  public email: string

  @IsString()
  public title: string

  @IsString()
  public description: string

  @IsDate()
  public date: Date

  @IsNumber()
  public duration: number

  @IsString()
  public type: string

  @IsString()
  public image: string

  @IsString()
  public location: string

}
