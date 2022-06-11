import { IsString, IsEmail, IsDateString, ValidateIf, IsNumber } from 'class-validator'

export class UpdateUserDto {

  @ValidateIf(UpdateUserDto => UpdateUserDto.email)
  @IsEmail()
  public email: string

  @ValidateIf(UpdateUserDto => UpdateUserDto.password)
  @IsString()
  public password: string

  @ValidateIf(UpdateUserDto => UpdateUserDto.firstName)
  @IsString()
  public firstName: string

  @ValidateIf(UpdateUserDto => UpdateUserDto.lastName)
  @IsString()
  public lastName: string

  @ValidateIf(UpdateUserDto => UpdateUserDto.birthday)
  @IsDateString()
  public birthday: Date

  @ValidateIf(UpdateUserDto => UpdateUserDto.description)
  @IsString()
  public description?: string

  @ValidateIf(UpdateUserDto => UpdateUserDto.avatarPath)
  @IsString()
  public avatarPath?: string

}
