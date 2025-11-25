import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getAll() {
    return {
      success: true,
      data: this.citiesService.getAllCities(),
      count: this.citiesService.getAllCities().length,
    };
  }

  @Get(':name')
  getByName(@Param('name') name: string) {
    const city = this.citiesService.getCityByName(name);
    
    if (!city) {
      return {
        success: false,
        message: 'Şehir bulunamadı',
        data: null,
      };
    }

    return {
      success: true,
      data: city,
    };
  }
}




