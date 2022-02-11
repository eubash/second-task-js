import { SecuritySystem } from './security-system';

export class Door extends SecuritySystem {

  constructor(
    public doorSize: number = 0,
    public doorStyle: 'neo' | 'classic' | 'modern' = 'neo',
    public open: boolean = false
  ) {
    super();
  }

  public openDoor(): void {
    // код, который открывает дверь
  }

  public closeDoor(): void {
    // код, который закрывает дверь
  }
}

export const DoorFactory = {
  makeDoor : (doorSize: number, doorStyle:'neo' | 'classic' | 'modern', open?: boolean): Door => new Door(doorSize, doorStyle, open)
};
