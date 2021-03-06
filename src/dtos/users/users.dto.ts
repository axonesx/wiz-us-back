import { IsString, IsEmail, IsDateString, ValidateIf } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  public email: string

  @IsString()
  public password: string

  @IsString()
  public firstName: string

  @IsString()
  public lastName: string

  @IsDateString()
  public birthday: Date

  @ValidateIf(CreateUserDto => CreateUserDto.description)
  @IsString()
  public description?: string

}
