import { House } from './entities/house';

export abstract class HouseCreator {

  public static createModernHouse(maxFloor: number = 1): House {
    return new House(
      {count: 3, size: 20, style: 'modern'},
      {size: 40, style: 'modern'},
      {color: "pink", floors: maxFloor},
      {type: 'modern'},
    );
  }

  public static createNeoHouse(maxFloor: number = 1): House {
    return new House(
      {count: 4, size: 30, style: 'neo'},
      {size: 60, style: 'neo'},
      {color: "blue", floors: maxFloor},
      {type: 'professional'},
    );
  }

  public static createClassicHouse(maxFloor: number = 1): House {
    return new House(
      {count: 2, size: 15, style: 'classic'},
      {size: 40, style: 'classic'},
      {color: "blue", floors: maxFloor},
      {type: 'amateur'},
    );
  }

}
