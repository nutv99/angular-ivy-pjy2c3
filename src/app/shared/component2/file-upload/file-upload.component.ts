import {
  Component,
  VERSION,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  url?: Blob;
  url2: string | ArrayBuffer;
  showFileSelect: boolean = false;

  @ViewChild('fileImg') myNameElem: ElementRef;
  @ViewChild('imgContainner') imgContainer99: ElementRef;
  @ViewChild('fileSelect') fileSelect: ElementRef;

  AddSelectFile() {
    this.fileSelect.nativeElement.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // alert(event.target.files.length)   ;
      // for (let i = 0; i <= event.target.files.length - 1; i++) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        //var img = new Image();
        this.url2 = event.target.result;
        console.log(this.url2);
        this.myNameElem.nativeElement.arrayBuffer = this.url2;
        this.imgContainer99.nativeElement.innerHTML +=
          '<img src="' +
          this.url2 +
          '" height=70 style="margin:5px;border:2px solid whitesmoke">';
        //console.log(img.width);
      };
      // } // for
    }
  }
}
