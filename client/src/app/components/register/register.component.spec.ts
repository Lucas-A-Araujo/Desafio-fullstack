import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RegisterService', ['postUser']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [{ provide: RegisterService, useValue: spy }]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit user data', () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      cpf: '123.456.789-00',
      phone: '(00) 1234-5678',
      knowledge: ['Git', 'React']
    };

    registerServiceSpy.postUser.and.returnValue(of('success'));

    component.name = userData.name;
    component.email = userData.email;
    component.cpf = userData.cpf;
    component.phone = userData.phone;
    component.selectedCourses = [1, 2];

    component.onSubmit(new Event('submit'));

    expect(registerServiceSpy.postUser).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      celular: userData.phone,
      knowledge: userData.knowledge
    });
  });

  xit('should handle HTTP error', () => {
    const errorResponse = new HttpErrorResponse({ status: 409, error: { message: 'Conflict' } });
    registerServiceSpy.postUser.and.returnValue(throwError(errorResponse));

    component.selectedCourses = [1];
    component.onSubmit(new Event('submit'));

    expect(registerServiceSpy.postUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Conflict');
  });

});
