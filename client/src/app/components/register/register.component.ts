import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, NgForm } from '@angular/forms';

interface CourseModel {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})
export class RegisterComponent {
  shouldShake: boolean = false;

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
        console.log(this.selectedCourses);
        this.selectedCourses.push(courseId);
      } else {
        console.log(this.selectedCourses);
      }
    }
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.selectedCourses.length === 0) {
      console.log('Não');
      this.shouldShake = true;
      setTimeout(() => {
        this.shouldShake = false;
      }, 500);
    }
    else{
      console.log('Enviado');
    }
  }
}
