import { IsDateString, IsOptional } from 'class-validator';

export class GetBooksQueryDto {
  @IsDateString()
  @IsOptional()
  readonly fromTime?: Date;

  @IsDateString()
  @IsOptional()
  readonly toTime?: Date;
}
