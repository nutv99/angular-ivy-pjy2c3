import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../_services/file-upload.service';
import { EmpService } from '../../../_services/emp.service';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
})
export class UploadImagesComponent implements OnInit {
  @Output() mylistchange  : EventEmitter<any> = new EventEmitter();
  @Output() InitDataImage : EventEmitter<any> = new EventEmitter();

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  readerAll: string[];

  previews: string[] = [];
  previews2: string = '';
  imageInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.InitDataImage.emit('');
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          this.mylistchange.emit(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }

    //this.mylistchange.emit(file);
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        //this.mylistchange.emit(this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
}
