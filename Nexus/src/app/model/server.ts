import { SystemInfo } from './system-info';
import { Service } from './service';

export class Server {
  host: string;
  services: Service[];
  systemInfo?: SystemInfo;
}
