
export interface IService {
  name: string;
  time_started: string;
  time_registered: string;
  status: string;

  start() : boolean
  stop() : boolean
}

