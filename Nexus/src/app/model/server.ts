import { SystemInfo } from './system-info';
import { Service } from './Service';

export class Server {
  host: string;
  services: Service[];
  systemInfo?: SystemInfo;
}
