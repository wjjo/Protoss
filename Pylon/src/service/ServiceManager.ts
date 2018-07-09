import { IService } from './IService';
import { ServiceDescription } from './ServiceDescription';
import { ServiceFactory } from './ServiceFactory';
import Collections = require('tstl');

export class ServiceManager {

  private static instance: ServiceManager;

  static getInstance() { 
    if(!ServiceManager.instance){
      ServiceManager.instance = new ServiceManager;
    }
    return ServiceManager.instance;
  }

  private services: Collections.Vector<IService> = new Collections.Vector();

  private constructor(){
    this.services.push_back(ServiceFactory.createPylonService());
  }

  getServices() : IService[] {
    return this.services.toJSON();
  }

  async startService(description: ServiceDescription) {
    let stopped = await this.stopService(description.name);
    if(stopped){
      let service = ServiceFactory.createService(description);
      this.services.push_back(service);
      service.start();
    }
    return true;
  }

  existService(id:string): boolean {
    let it = Collections.find_if(this.services.begin(), this.services.end(), (service:IService) => {
      if(service.name == id){
        return true;
      }
      return false;
    });
    
    return !it.equals(this.services.end());
  }

  async stopService(id: string){
    let it = await Collections.find_if(this.services.begin(), this.services.end(), (service:IService) => {
      if(service.name == id){
        console.log('find');
        return true;
      }
      return false;
    });
    
    let found = !it.equals(this.services.end());
    if(found){
      if(it.value.stop()){
        this.services.erase(it);
        console.log('previous '+ id + ' stopped!');
      }
      else{
        console.log('could not stopped service: '+ id);
        return false;
      }
    }

    return true;
  }
}