import { IsOptional, IsString, Matches } from 'class-validator';

export class GetBooksQueryDto {
  @IsString({ message: 'date should be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date should match YYYY-MM-DD format',
  })
  @IsOptional()
  readonly date?: string;

  @IsString({ message: 'from time should be a string' })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: 'from time should match hh:mm:ss format',
  })
  @IsOptional()
  readonly fromTime?: string;

  @IsString({ message: 'to time should be a string' })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: 'to time should match hh:mm:ss format',
  })
  @IsOptional()
  readonly toTime?: string;
}
