import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  success(msg: string, detail?: string) {
    this.toastr.success(detail, msg);
  }

  error(msg: string, detail?: string) {
    this.toastr.error(detail, msg);
  }
}
