import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as p from 'path';
import { ToasterService } from '../notification/toaster.service';



@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private httpClient: HttpClient,
    private toater: ToasterService
  ) { }

  download(url: string) {
    return this.httpClient.get(url, { responseType: 'blob' }).toPromise();
  }

  getLocalFile(path: string): File {
    return new File([fs.readFileSync(path)], this.getOnlyName(path));
  }

  /**
   * 경로 아래에서 파일, 폴더 찾음 (not recursive)
   * @param root 찾을 경로
   * @param filter 필터
   */
  find(root: string, filter: Function) {
    const result: string[] = [];

    fs.readdirSync(root).forEach(element => {
      if (!filter) {
        // 필터 없으면, 경로 아래 모든 파일 이름 추가
        result.push(element);
      } else {
        // 필터 있으면, 필터링된 파일 이름만 추가
        if (filter(element)) {
          result.push(element);
        }
      }
    });

    return result;
  }

  join(path1: string, path2: string) {
    return p.join(path1, path2);
  }

  /**
   * 부모 디렉터리 경로
   * @param path
   */
  parent(path: string) {
    return this.join(path, '..');
  }

  getOnlyName(path: string) {
    return path.split('/').pop();
  }

  /**
   * json 파일 읽고 내용 반환
   * @param path
   */
  readJsonSync(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
}
