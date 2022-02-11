import { Door } from './door';
import {  WindowModel } from './window-model';

interface HousePlan
{
  setFloors(maxFloor: number): void;
  addFloor(): void;
  paint(color: string): void;
  openAllWindows(): void;
  setDoor(door: Door): void;
  setWindows(windows: WindowModel[]): void;
  setSecurity(securitySystemType: string): void;
}

export class House implements HousePlan {
  public maxFloor: number = 1;
  public color: string = 'black';
  public windows: WindowModel[] = [];
  public door: Door = <Door>{};


  public setFloors(maxFloor: number) {
    this.maxFloor = maxFloor;
  }

  public paint(color: string) {
    this.color = color;
  }

  public setWindows(windows: WindowModel[]) {
    this.windows = windows;
  }

  public setDoor(door: Door) {
    this.door = door;
  }

  setSecurity(securitySystemType: 'modern' | 'amateur' | 'professional') {
      this.door.securitySystemNotCreated = true;
      this.door.securitySystemType = securitySystemType;
  }

  public openAllWindows() {
    this.windows.forEach((window: WindowModel) => window.openWindow());
  }

  public addFloor() {
    this.maxFloor += 1;
  }
}
