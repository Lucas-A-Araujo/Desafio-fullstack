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
        console.log(this.formatCpf(data.cpf))
        data.cpf = this.formatCpf(data.cpf);
        data.celular = this.formatPhoneNumber(data.celular);
        console.log(data)
        console.log('///////////')
        this.user = data;
      });
    });
  }

  validateUser(valido: boolean) {

  }


  private formatCpf(cpf: string): string {
    const numericCpf = cpf.replace(/\D/g, '');

    const cpfParts = numericCpf.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (cpfParts) {
      return `${cpfParts[1]}.${cpfParts[2]}.${cpfParts[3]}-${cpfParts[4]}`;

    } else {
      return cpf;
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const numericPhone = phoneNumber.replace(/\D/g, '');

    const phoneParts = numericPhone.match(/^(\d{2})(\d{4})(\d{4})$/);
    console.log(numericPhone);
    console.log(phoneParts);
    if (phoneParts) {
      return `(${phoneParts[1]}) ${phoneParts[2]}-${phoneParts[3]}`;
    } else {
      return phoneNumber;
    }
  }
}
