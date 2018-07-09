import fs = require('fs')

export class History {

    private static instance: History;
  
    static getInstance() { 
      if(!History.instance){
        History.instance = new History;
      }
      return History.instance;
    }

    private constructor(){
        let msg = new Date().toString() + '-+-Initialized' + '\n';
        fs.writeFile('history.txt', msg, (err) => {
            if(err) throw err;
        });
    }
    
    put(message: string){
        let msg = new Date().toString() + '-+-' + message + '\n';
        fs.writeFile('history.txt', msg, {'flag':'a+'}, (err) => {
            if(err) throw err;
        });
        
    }
  
    getHistories() : {}[] {
        let lines:{}[] = [];
        let fileContent = fs.readFileSync('history.txt', 'utf-8')
        fileContent.split('\n').map((value, index, array) => {
            let values = value.split('-+-');
            if(values.length == 2){
                lines.push({
                    'time' : values[0],
                    'message': values[1]
                });
            }
        });
        return lines;
    }
  }