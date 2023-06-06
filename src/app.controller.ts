import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('provinces')
  getProcinces() {
    var obj = JSON.parse(fs.readFileSync('values/provinces.json', 'utf8'));

    return obj?.province?.map((province) => {
      return {
        label: province.name,
        value: province.idProvince,
      };
    });
  }

  @Get('districts')
  getDistricts(@Query('province') province: number) {
    var obj = JSON.parse(fs.readFileSync('values/provinces.json', 'utf8'));

    return obj?.district
      ?.filter((district) => district.idProvince === province)
      ?.map((district) => {
        return {
          label: district.name,
          value: district.idProvince,
        };
      });
  }
}
