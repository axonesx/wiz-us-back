import { IsString } from 'class-validator';

export class CreateTypeDto {

  @IsString()
  public title: string;

  @IsString()
  public description: string;

}
