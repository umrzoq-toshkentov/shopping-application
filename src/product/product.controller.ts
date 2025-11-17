import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.delete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    const products = await this.productService.findWithReviews(dto);
    return products;
  }
}
