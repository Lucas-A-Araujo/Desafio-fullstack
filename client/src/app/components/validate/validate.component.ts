import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private validateService: ValidateService ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userName = params['nomeColaborador'];
      this.validateService.getUserByName(userName).subscribe((data: any) => {
        console.log('///////////')
        console.log(data)
        console.log('///////////')
        this.user = data;
      });
    });
  }

  validateUser(valido: boolean) {}
}
