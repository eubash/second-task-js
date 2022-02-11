import { House } from './entities/house';
import { DoorFactory } from './entities/door';
import { WindowFactory } from './entities/window-model';

type SecuritySystemConfig = { type: 'modern' | 'amateur' | 'professional' };
type WindowsConfig = { count: number, size: number; style: 'neo' | 'classic' | 'modern' };
type DoorConfig = { size: number; style: 'neo' | 'classic' | 'modern' };


interface HouseBuilderInterface
{
  buildFloors(floors: number): HouseBuilder;
  paint(color: string): HouseBuilder;
  buildWindows(windowsConfig: WindowsConfig): HouseBuilder;
  buildDoor(doorConfig: DoorConfig): HouseBuilder;
  setSecuritySystem(securitySystemConfig: SecuritySystemConfig): HouseBuilder;
  getHouse(): House;
}


export class HouseBuilder implements HouseBuilderInterface {
  private house: House;

  constructor(
      public windowsConfig: WindowsConfig,
      public doorConfig: DoorConfig,
      public securitySystemConfig?: SecuritySystemConfig
  ) {
    this.house = new House();
  }

  public buildFloors(floors: number) {
    this.house.setFloors(floors);
    return this;
  }

  public addFloor() {
    this.house.addFloor();
    return this;
  }

  public paint(color: string) {
    this.house.paint(color);
    return this;
  }

  public buildWindows(windowsConfig: { count: number, size: number; style: 'neo' | 'classic' | 'modern' }) {
    this.house.setWindows(windowsConfig.count > 0
        ? Array.from({ length: windowsConfig.count }, () => WindowFactory.makeWindow(windowsConfig.size, windowsConfig.style))
        : []);
    return this;
  }

  public buildDoor(doorConfig: { size: number; style: 'neo' | 'classic' | 'modern' }) {
    this.house.setDoor(DoorFactory.makeDoor(doorConfig.size, doorConfig.style));
    return this;
  }

  public setSecuritySystem(securitySystemConfig: { type: 'modern' | 'amateur' | 'professional' }) {
    this.house.setSecurity(securitySystemConfig.type);
    return this;
  }

  public getHouse() {
    const house = this.house;
    this.reset();
    return house;
  }

  reset() {
    this.house = new House();
  }
}

class HouseCreator {
  constructor(public builder: HouseBuilder) {}

  createHouse(floors: number, color: string): House {
    return this.builder
        .buildFloors(floors)
        .paint(color)
        .buildWindows(this.builder.windowsConfig)
        .buildDoor(this.builder.doorConfig)
        .setSecuritySystem(this.builder.securitySystemConfig as SecuritySystemConfig)
        .getHouse();

  }

  createCustomHouse(): House {
      this.builder
          .buildWindows(this.builder.windowsConfig)
          .buildDoor(this.builder.doorConfig);

      if(this.builder.securitySystemConfig) this.builder.setSecuritySystem(this.builder.securitySystemConfig);

      return this.builder.getHouse();
  }

}

export const houseCreator = {
  createModernHouse: (floors: number = 1) => new HouseCreator(new HouseBuilder(
      {count: 3, size: 20, style: 'modern'},
      {size: 40, style: 'modern'},
      {type: 'modern'}
  )).createHouse(floors, "pink"),

  createNeoHouse: (floors: number = 1) => new HouseCreator(new HouseBuilder(
      {count: 4, size: 30, style: 'neo'},
      {size: 60, style: 'neo'},
      {type: 'professional'}
  )).createHouse(floors, "blue"),

  createClassicHouse: (floors: number = 1) => new HouseCreator(new HouseBuilder(
      {count: 2, size: 15, style: 'classic'},
      {size: 40, style: 'classic'},
      {type: 'amateur'}
  )).createHouse(floors, "blue"),

  createCustomHouse: (windowConfig: WindowsConfig, doorConfig: DoorConfig, securityConfig?: SecuritySystemConfig) => new HouseCreator(new HouseBuilder(windowConfig, doorConfig, securityConfig)).createCustomHouse()
};

