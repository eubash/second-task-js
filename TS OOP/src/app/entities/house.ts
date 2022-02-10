import { Door } from './door';
import { WindowModel } from './window-model';

export class House {
  public maxFloor: number = 1;
  public color: string = 'black';
  public windows: WindowModel[] = [];
  public door: Door | null = null;

  public constructor(
    windowsConfig: { count: number, size: number; style: 'neo' | 'classic' | 'modern' },
    doorConfig: { size: number; style: 'neo' | 'classic' | 'modern' },
    houseConfig?: { color: string, floors: number },
    securitySystemConfig?: { type: 'modern' | 'amateur' | 'professional' },
  ) {

    if (securitySystemConfig && this.door) {
      this.door.securitySystemNotCreated = true;
      this.door.securitySystemType = securitySystemConfig.type;
    }

    if (houseConfig) {
      this.color = houseConfig.color;
      if (houseConfig.floors > 1) {
        for (let i = 1; i < houseConfig.floors; i++) {
          this.addFloor();
        }
      }
    }

    this.windows = windowsConfig.count > 0
      ? Array.from({ length: windowsConfig.count }, () => new WindowModel(windowsConfig.size, windowsConfig.style))
      : [];

    this.door = new Door(doorConfig.size, doorConfig.style);
  }

  public openAllWindows() {
    this.windows.forEach((window: WindowModel): void => window.openWindow());
  }

  public paint(color: string) {
    this.color = color;
  }

  public addFloor() {
    this.maxFloor += 1;
  }
}
