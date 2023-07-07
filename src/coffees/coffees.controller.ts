import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDot } from 'src/common/dto/pagination-query.dot';
import { TestFilterFilter } from 'src/testFilter.filter';
import { TestFilterHandleException } from 'src/testFilterHandle';
import { AaaGuard } from 'src/aaa.guard';

//@Query ?后的参数
//param url/后的参数

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  @UseFilters(TestFilterFilter)
  @UseGuards(AaaGuard)
  findAll(@Query() PaginationQueryDot: PaginationQueryDot) {
    throw new TestFilterHandleException('aaa', 'bbb');
    return this.coffeesService.findAll(PaginationQueryDot);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    console.log('update');
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
