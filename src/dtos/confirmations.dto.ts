import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateConfirmationDto {

  @IsString()
  public code: string

  @IsBoolean()
  public isConfirmed: boolean

}
