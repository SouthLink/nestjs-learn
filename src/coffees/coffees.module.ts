import { Injectable, Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './const';
import { Connection } from 'typeorm';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  // 重定向 provide，用于 mock，或环境区分
  // providers: [{provide: CoffeesService, useValue: process.env.NODE_ENV === 'production' ? CoffeeSevice : MockCoffeeSevice}]
  // 自定义 providers
  // providers: [{provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe']}],
  // 工厂模式提供者 provides factory
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: (brandsFactory: CoffeeBrandsFactory) =>
  //       brandsFactory.create(),
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],
  // 异步提供者 aysnc provides
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('Select * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);

        return coffeeBrands;
      },
      inject: [Connection],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
