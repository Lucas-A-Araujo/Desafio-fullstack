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

  /*checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}
  /*onSubmit(form: NgForm) {
    if (form.valid) {
      // Lógica para lidar com o envio do formulário
      console.log(form.value);
    }

    onSubmit(): void {
      // Process checkout data here
      //this.items = this.cartService.clearCart();
      console.warn('Your order has been submitted', this.checkoutForm.value);
      this.checkoutForm.reset();
    }*/

    ///////////////



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

  handleSubmit(): void {
    console.log('courses id:', this.selectedCourses);
  }


    //////////////////

    items = [{
      name: '',
      price: '0'
    }];

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Your order has been submitted');
  }
}
