import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() product: Omit<ProductModel, '_id'>) {
    // Implementation for creating a product
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    // Implementation for getting a product by ID
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // Implementation for deleting a product by ID
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: ProductModel) {
    // Implementation for updating a product by ID
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    // Implementation for finding a product by ID
  }
}
