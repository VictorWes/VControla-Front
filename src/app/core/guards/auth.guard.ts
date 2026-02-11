import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    console.log('🛡️ AUTH GUARD VERIFICANDO:', state.url);
    const decoded: any = jwtDecode(token);

    const expirationDate = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationDate < currentTime) {
      console.warn('Token expirado detectado no Guard. Redirecionando...');
      localStorage.clear();

      router.navigate(['/auth/login']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    localStorage.clear();
    router.navigate(['/auth/login']);
    return false;
  }
};
