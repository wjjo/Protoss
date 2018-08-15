import { ServiceDescription } from './service/ServiceDescription';
import { ServiceManager } from './service/ServiceManager';
import { History } from './history/History';
import { System } from './system/System';
import express = require("express");
import multer = require("multer");
import fs = require("fs")


let uploadCount:number = 0;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'services/')
  },
  filename: function (req, file, cb) {
    cb(null, (uploadCount % 100) + '-' + file.originalname )
  }
})


class App {
  public app: express.Application;

  public static bootstrap (): App {
    return new App();
  }

  public static mkdir(folder:string){
    if(!fs.existsSync(folder)) fs.mkdirSync(folder);
  }

  constructor () {
    // create directory
    App.mkdir("workspace");
    App.mkdir("services");

    this.app = express();
    let upload = multer({storage: storage, limits: { preservePath: true }});

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      History.getInstance().put("Request Status Check(GET)");
      res.send({"status": "ON"})
    });
    
    this.app.get("/services", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // History.getInstance().put("Request Service List Information(GET)");
      res.send(ServiceManager.getInstance().getServices())
    });
    
    let artifact = upload.fields([{name:'artifact', maxCount: 1 }, {name:'description',maxCount: 1 }]);
    this.app.post("/services", artifact, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // History.getInstance().put("Request New Service Information(POST)");
      uploadCount++;
      if(uploadCount > 10000) uploadCount = 0;

      console.log(req.files);

      let artifactInfo = req.files['artifact'][0];
      let descriptionInfo = req.files['description'][0];

      let description:ServiceDescription = JSON.parse(fs.readFileSync(descriptionInfo['path']).toString());
      
      let workingDirectoryPath = ('workspace/' + description.name + '_' + Date.now()).replace(' ', '_');

      if(!fs.existsSync(workingDirectoryPath)) fs.mkdirSync(workingDirectoryPath);
      description.artifactRealPath = workingDirectoryPath + '/' + artifactInfo['originalname']

      fs.copyFileSync(artifactInfo['path'], description.artifactRealPath);
      
      description.artifact = artifactInfo['originalname'];
      description.workingDir = workingDirectoryPath;
      
      ServiceManager.getInstance().startService(description);

      res.send(description)
    });

    this.app.delete("/services/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      History.getInstance().put("Request Delete Service Information(POST)");
      //console.log(req.params.id);
      console.log(req.params);
      if(ServiceManager.getInstance().existService(req.params.id)){
        ServiceManager.getInstance().stopService(req.params.id);
        res.sendStatus(200);
      }
      else{
        // Resource Not Found
        res.sendStatus(404);
      }
      
    });

    this.app.get("/history", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      History.getInstance().put("Request History Information(GET)");
      res.send(History.getInstance().getHistories())
    });

    this.app.get("/system", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // History.getInstance().put("Request System Information(GET)");
      System.getInstance().getSystem().then(data => {
        res.send(data)
      });
    });
  }
}3

export default App;  