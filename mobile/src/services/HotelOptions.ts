import tv from '../../assets/images/tv.png';
import pool from '../../assets/images/pool.png';
import pets from '../../assets/images/pets.png';
import wifi from '../../assets/images/wifi.png';
import coffee from '../../assets/images/coffee.png';

export type HotelsOptionsProps = {
  hotelOptions?: string;
};
class HotelsOptions<HotelsOptionsProps> {
  [name: string | symbol]: (() => string) | boolean;
  digitalTV: boolean;
  coffee: boolean;
  wifi: boolean;
  pets: boolean;
  pool: boolean;

  constructor(hotelOptions = '') {
    this.digitalTV = false;
    this.coffee = false;
    this.wifi = false;
    this.pets = false;
    this.pool = false;
    hotelOptions &&
      hotelOptions.split(',').forEach((item: string) => {
        this[item] = true;
      });
  }
  toString(): string {
    const hotelOptionsArray: string[] = [];
    for (let prop in this) {
      this[prop] && hotelOptionsArray.push(prop);
    }
    return hotelOptionsArray.join(',');
  }
  show(): any {
    const hotelOptionsArray: object[] = [];
    for (let prop in this) {
      if (this[prop]) {
        switch (prop) {
          case 'pool':
            hotelOptionsArray.push({title: 'Pool', image: pool});
            break;
          case 'digitalTV':
            hotelOptionsArray.push({title: 'DigitalTV', image: tv});
            break;
          case 'coffee':
            hotelOptionsArray.push({title: 'Coffee', image: coffee});
            break;
          case 'wifi':
            hotelOptionsArray.push({title: 'Wifi', image: wifi});
            break;
          case 'pets':
            hotelOptionsArray.push({title: 'Pets', image: pets});
            break;
        }
      }
    }
    return hotelOptionsArray;
  }
}
export {HotelsOptions};
