import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../../_services/emp.service';

import { Emp } from '../../../_models/emp';
import { first } from 'rxjs';

@Component({
  selector: 'app-tabledata1',
  templateUrl: './tabledata1.component.html',
  styleUrls: ['./tabledata1.component.css'],
})
export class Tabledata1Component implements OnInit {
  
  employees!: Emp[];
  totalrow: number = 0;
  headerTable = ['ชื่อ', 'นามสกุล', 'อีเมล์', 'เบอร์โทร', ''];

  constructor(private empService: EmpService) {}

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.empService
      .getAll()
      .pipe(first())
      .subscribe((d) => {
        this.employees = d;
        this.totalrow = d.length;
      });
  }

  delete(emp: Emp) {
    this.empService
      .delete(emp.empId)
      .pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      });
  }
}
