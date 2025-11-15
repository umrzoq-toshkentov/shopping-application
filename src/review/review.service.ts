import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteResult, Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ReturnModelType<typeof ReviewModel>,
  ) {}

  async create(review: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return await this.reviewModel.create({
      ...review,
      productId: new Types.ObjectId(review.productId),
    });
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(
    productId: string,
  ): Promise<DocumentType<ReviewModel>[]> {
    return await this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
