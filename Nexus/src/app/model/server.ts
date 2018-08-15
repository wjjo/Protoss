import { HttpClient } from '@angular/common/http';
import { SystemInfo } from './system/system-info';

import { Service } from './service';

export interface Server {
  status?: string;
  host: string;
  services: Service[];
  systemInfo?: SystemInfo;

}
