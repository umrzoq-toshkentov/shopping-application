import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserModel } from 'src/auth/user.model';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() review: CreateReviewDto) {
    return this.reviewService.create(review);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc)
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    return deletedDoc;
  }

  @UseGuards(JwtAuthGuard)
  @Get('product/:productId')
  async getReviewByProduct(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() user: UserModel,
  ) {
    console.log(user);
    return await this.reviewService.findByProductId(productId);
  }
}
