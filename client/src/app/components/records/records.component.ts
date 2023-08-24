import { Component, OnInit } from '@angular/core';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  users: any[] = [];

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.getUsers().subscribe((data: any) => {
      console.log('aaaaaa')
      this.users = data;
      console.log(data)
    });
  }
}
