import { IsString, IsNumber } from 'class-validator';

export class CreateOpinionDto {

  @IsNumber()
  public note: number;

  @IsString()
  public title: string;

  @IsString()
  public comment: string;

}
