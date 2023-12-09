import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewExpenseComponent } from './pages/new-expense/new-expense.component';
import { NewIncomeComponent } from './pages/new-income/new-income.component';
import { EditExpenseComponent } from './pages/edit-expense/edit-expense.component';
import { EditIncomeComponent } from './pages/edit-income/edit-income.component';
import { LoginComponent } from './pages/login/login.component';
import { OptionsComponent } from './pages/options/options.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomesComponent } from './pages/incomes/incomes.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'incomes', component: IncomesComponent },
  { path: 'new-expense', component: NewExpenseComponent },
  { path: 'new-income', component: NewIncomeComponent },
  { path: 'edit-expense', component: EditExpenseComponent },
  { path: 'edit-income', component: EditIncomeComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];
