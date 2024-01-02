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
import { authGuard } from './auth.guard';
import { FilterByDatesComponent } from './pages/filter-by-dates/filter-by-dates.component';
import { SavingHistoryComponent } from './pages/saving-history/saving-history.component';
import { MovementsByTypeComponent } from './pages/movements-by-type/movements-by-type.component';

// export const routes: Routes = [
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },
//   { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
//   { path: 'incomes', component: IncomesComponent, canActivate: [authGuard] },
//   {
//     path: 'new-expense',
//     component: NewExpenseComponent,
//     canActivate: [authGuard],
//   },
//   {
//     path: 'new-income',
//     component: NewIncomeComponent,
//     canActivate: [authGuard],
//   },
//   {
//     path: 'edit-expense',
//     component: EditExpenseComponent,
//     canActivate: [authGuard],
//   },
//   {
//     path: 'edit-income',
//     component: EditIncomeComponent,
//     canActivate: [authGuard],
//   },
//   { path: 'options', component: OptionsComponent, canActivate: [authGuard] },
//   {
//     path: 'filter-by-dates',
//     component: FilterByDatesComponent,
//     canActivate: [authGuard],
//   },
//   {
//     path: 'movements-by-type',
//     component: MovementsByTypeComponent,
//     canActivate: [authGuard],
//   },
//   {
//     path: 'saving-history',
//     component: SavingHistoryComponent,
//     canActivate: [authGuard],
//   },
//   { path: 'login', component: LoginComponent },
//   { path: '**', redirectTo: 'home' },

// ];
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'incomes', component: IncomesComponent },
  {
    path: 'new-expense',
    component: NewExpenseComponent,
    
  },
  {
    path: 'new-income',
    component: NewIncomeComponent,
    
  },
  {
    path: 'edit-expense',
    component: EditExpenseComponent,
    
  },
  {
    path: 'edit-income',
    component: EditIncomeComponent,
    
  },
  { path: 'options', component: OptionsComponent },
  {
    path: 'filter-by-dates',
    component: FilterByDatesComponent,
    
  },
  {
    path: 'movements-by-type',
    component: MovementsByTypeComponent,
    
  },
  {
    path: 'saving-history',
    component: SavingHistoryComponent,
    
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];
