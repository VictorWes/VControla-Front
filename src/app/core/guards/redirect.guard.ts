import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/sistema/dashboard/home']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false;
};
