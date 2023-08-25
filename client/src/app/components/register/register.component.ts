import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { HttpErrorResponse } from '@angular/common/http';

interface CourseModel {
  id: number;
  name: string;
}

interface UserRegisterModel {
  name: string;
  email: string;
  cpf: string;
  celular: string;
  knowledge: string[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})
export class RegisterComponent {
  shouldShake: boolean = false;

  name: string = '';
  email: string = '';
  cpf: string = '';
  phone: string = '';
  formattedCpf: string = '';

  courses: CourseModel[] = [
    { id: 1, name: 'Git' },
    { id: 2, name: 'React' },
    { id: 3, name: 'PHP' },
    { id: 4, name: 'NodeJS' },
    { id: 5, name: 'DevOps' },
    { id: 6, name: 'Banco de Dados' },
    { id: 7, name: 'TypeScript' },
  ];

  selectedCourses: number[] = [];

  handleCourseSelection(courseId: number): void {
    if (this.selectedCourses.includes(courseId)) {
      this.selectedCourses = this.selectedCourses.filter(id => id !== courseId);
    } else {
      if (this.selectedCourses.length < 3) {
        this.selectedCourses.push(courseId);
      }
    }
  }

  constructor(
    private registerService: RegisterService,
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    const selectedCourseNames = this.getSelectedCourseNames();
    const user: UserRegisterModel = {
      name: this.name,
      email: this.email,
      cpf: this.formatCpf(this.cpf),
      celular: this.phone,
      knowledge: selectedCourseNames
    }
    if (this.selectedCourses.length === 0) {
      this.shouldShake = true;
      setTimeout(() => {
        this.shouldShake = false;
      }, 500);
    }
    else{
      this.registerService.postUser(user).subscribe((data: any) => {
        alert('Dados enviados! Já pode fechar a tela');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          alert(error.error.message);
        } else {
          alert('Erro desconhecido:');
        }
      }
      );
    }
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

  private getSelectedCourseNames(): string[] {
    return this.courses
      .filter(course => this.selectedCourses.includes(course.id))
      .map(course => course.name);
  }
}
