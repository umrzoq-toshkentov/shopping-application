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
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    // Implementation for creating a product
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    // Implementation then
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // Implementation for deleting a product by ID
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() topPage: TopPageModel) {
    // Implementation for updating a product by ID
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    // Implementation for finding a product by ID
  }
}
