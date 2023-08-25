import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsComponent } from './records.component';
import { of } from 'rxjs';
import { RecordsService } from 'src/app/services/records.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let recordsServiceSpy: jasmine.SpyObj<RecordsService>;

  const usersData = [
    { id: 1, name: 'User A', email: 'a@example.com', cpf: '111.111.111-11', celular: '123456789', knowledge: [] },
    { id: 2, name: 'User B', email: 'b@example.com', cpf: '222.222.222-22', celular: '987654321', knowledge: [] },
  ];

  beforeEach(() => {
    const recordsSpy = jasmine.createSpyObj('RecordsService', ['getUsers']);

    TestBed.configureTestingModule({
      declarations: [RecordsComponent],
      imports: [FormsModule],
      providers: [
        { provide: RecordsService, useValue: recordsSpy },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) } // Provide a mock Router
      ]
    });

    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    recordsServiceSpy = TestBed.inject(RecordsService) as jasmine.SpyObj<RecordsService>;

    recordsServiceSpy.getUsers.and.returnValue(of(usersData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display users', () => {
    expect(recordsServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(usersData);
  });

  it('should filter users by search term', () => {
    component.searchTerm = 'User A';
    fixture.detectChanges();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('User A');
  });
});
