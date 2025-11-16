import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsMongoId,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}
