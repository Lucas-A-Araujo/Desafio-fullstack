import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from 'src/app/services/records.service';

interface UserModel {
  id: number;
  name: string;
  email: string;
  cpf: string;
  celular: string;
  knowledge: any[];
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private recordsService: RecordsService, private router: Router) { }

  ngOnInit() {
    this.recordsService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.sortUsersByName();
    });
  }

  onUserCardClick(user: UserModel) {
    let name = user.name.replace(' ', '').toLowerCase();
    this.router.navigate([`/${name}/validar`]);
  }

  private sortUsersByName() {
    this.users.sort((a, b) => a.name.localeCompare(b.name));
  }
}
