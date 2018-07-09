
export class ServiceDescription {

    serviceType: string;
    name: string;
    artifact: string;
    option: string [];
    

    // 요청시 부여됨
    workingDir: string;
    artifactRealPath: string;
    
    constructor(serviceType: string, workingDir: string, name: string, artifact: string, option: string[]){
        this.serviceType = serviceType;
        this.workingDir = workingDir;
        this.name = name;
        this.artifact = artifact;
        this.option = option;
        this.artifactRealPath = ''
    }
}
