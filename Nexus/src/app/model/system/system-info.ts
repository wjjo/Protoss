import { Disk } from './disk';
import { Memory } from './memory';
import { Cpu } from './cpu';
import { Nic } from './nic';

export class SystemInfo {
  cpu: Cpu;
  mem: Memory;
  nic: Nic[];
  disk: Disk[];
}
