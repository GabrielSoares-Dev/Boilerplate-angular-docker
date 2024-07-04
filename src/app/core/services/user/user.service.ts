import { Injectable } from '@angular/core';
import { CookieService } from '@services/cookie/cookie.service';
import { jwtDecode } from 'jwt-decode';
import { UserDto, UserDtoTokenDecoded } from '@dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookie: CookieService) {}

  getCurrent(): UserDto {
    const token = this.cookie.get('token');

    const data = jwtDecode(token) as UserDtoTokenDecoded;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phoneNumber: data.phone_number,
      role: data.role,
      permissions: data.permissions,
    };
  }

  isAuthenticated() {
    let isAuthenticated: boolean;
    try {
      this.getCurrent();
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }

    return isAuthenticated;
  }

  getToken() {
    return this.cookie.get('token');
  }
}
