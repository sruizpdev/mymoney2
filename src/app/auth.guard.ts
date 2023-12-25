import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { GeneralService } from './general.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const generalService = inject(GeneralService);

  const lsItem = localStorage.getItem('user');
  if (lsItem) {
    if (JSON.parse(lsItem).uid == generalService.whoIsLogged()) {
      return true;
    } else {
      localStorage.removeItem('user');
      router.navigate(['login']);
      return false;
    }
  } else {
    router.navigate(['login']);
    return false;
  }
};
