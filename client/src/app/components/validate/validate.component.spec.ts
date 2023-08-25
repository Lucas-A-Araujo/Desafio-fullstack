import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateComponent } from './validate.component';
import { of } from 'rxjs';
import { ValidateService } from 'src/app/services/validate.service';
import { ActivatedRoute } from '@angular/router';

describe('ValidateComponent', () => {
  let component: ValidateComponent;
  let fixture: ComponentFixture<ValidateComponent>;
  let validateServiceSpy: jasmine.SpyObj<ValidateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValidateService', ['getUserByName', 'changeUserStatus']);

    TestBed.configureTestingModule({
      declarations: [ValidateComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ nomeColaborador: 'testUser' }) } },
        { provide: ValidateService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(ValidateComponent);
    component = fixture.componentInstance;
    validateServiceSpy = TestBed.inject(ValidateService) as jasmine.SpyObj<ValidateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and format it', () => {
    const userData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      cpf: '12345678900',
      celular: '0012345678',
      status: true,
      knowledge: [{ name: 'Angular' }, { name: 'React' }]
    };

    validateServiceSpy.getUserByName.and.returnValue(of(userData));

    component.ngOnInit();

    expect(validateServiceSpy.getUserByName).toHaveBeenCalled();
    expect(component.user).toEqual({
      ...userData,
      cpf: '123.456.789-00',
      celular: '(00) 1234-5678'
    });
  });
});
