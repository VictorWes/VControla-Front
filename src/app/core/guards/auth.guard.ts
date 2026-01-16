import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  if (token) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
