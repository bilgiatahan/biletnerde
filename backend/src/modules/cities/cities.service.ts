import { Injectable } from '@nestjs/common';
import { TURKISH_CITIES, TurkishCity } from '../../common/constants/turkish-cities.constant';

@Injectable()
export class CitiesService {
  getAllCities(): TurkishCity[] {
    return [...TURKISH_CITIES];
  }

  getCityByName(name: string): TurkishCity | undefined {
    return TURKISH_CITIES.find(
      (city) => city.name.toLowerCase() === name.toLowerCase(),
    );
  }

  getCityByCode(code: string): TurkishCity | undefined {
    return TURKISH_CITIES.find((city) => city.code === code);
  }
}

