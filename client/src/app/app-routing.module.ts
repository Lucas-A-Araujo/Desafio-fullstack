import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ValidateComponent } from './components/validate/validate.component';
import { RecordsComponent } from './components/records/records.component';

const routes: Routes = [{
  path: ':nomeColaborador/registrar',
  component: RegisterComponent
},
{
  path: ':nomeColaborador/validar',
  component: ValidateComponent
},
{
  path: 'registros',
  component: RecordsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
