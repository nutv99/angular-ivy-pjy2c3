import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrls: ['./ttt.component.css'],
})
export class tttComponent implements OnInit {
  staffForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.staffForm = this.fb.group({
      id: [''],
      shopID: [''],
    });
  }
}
