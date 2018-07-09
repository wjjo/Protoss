import { IService } from './IService';
import { ServiceDescription } from './ServiceDescription';
import * as Services from './Services';

export class ServiceFactory {
  static createService(description : ServiceDescription) : IService {
    if(description.serviceType == 'springboot'){
      let service = new Services.SpringBootService(description.workingDir, description.name, description.artifactRealPath, description.option);
      return service;
    }

    //
    return new Services.NullService();
  }

  static createPylonService(): IService {
    return new Services.PylonService();
  }
}