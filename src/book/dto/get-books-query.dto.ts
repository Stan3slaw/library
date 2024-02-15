import { IsOptional, IsString, Matches } from 'class-validator';

export class GetBooksQueryDto {
  @IsString({ message: 'from time should be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: 'from time should match YYYY-MM-DDThh:mm:ss format',
  })
  @IsOptional()
  readonly fromTime?: string;

  @IsString({ message: 'to time should be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: 'to time should match YYYY-MM-DDThh:mm:ss format',
  })
  @IsOptional()
  readonly toTime?: string;
}
