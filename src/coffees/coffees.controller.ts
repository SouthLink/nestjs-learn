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
  UseInterceptors,
  ParseIntPipe,
  HttpException,
  ParseArrayPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDot } from 'src/common/dto/pagination-query.dot';
import { TestFilterFilter } from 'src/testFilter.filter';
import { TestFilterHandleException } from 'src/testFilterHandle';
import { AaaGuard } from 'src/aaa.guard';
import { TestInterceptorInterceptor } from 'src/test.interceptor.interceptor';

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

  @Get('test')
  test(
    @Query(
      'a',
      // 自定义 Pipe 状态码
      // new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,}),
      // 自定义 Pipe 异常
      // new ParseIntPipe({
      //   exceptionFactory: (error) => {
      //     throw new HttpException('xxx' + error, HttpStatus.NOT_ACCEPTABLE);
      //   },
      // }),
    )
    a: string,
  ): string {
    console.log(a);
    return '123123123' + a;
  }

  @Get('testarray')
  testarray(
    @Query(
      'arr',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
      }),
    )
    a: string,
  ): string {
    console.log(a);
    return '123123123' + a;
  }

  @Get()
  @UseFilters(TestFilterFilter)
  @UseGuards(AaaGuard)
  // @UseInterceptors(TestInterceptorInterceptor)
  async findAll(@Query() PaginationQueryDot: PaginationQueryDot) {
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    // return 'bbb';
    // throw new Error('Method not implemented.');
    // throw new TestFilterHandleException('aaa', 'bbb');
    return this.coffeesService.findAll(PaginationQueryDot);
  }

  @Get(':id')
  // @UseInterceptors(TestInterceptorInterceptor)
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
