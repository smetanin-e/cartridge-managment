import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      login: string;
      surname: string;
      firstName: string;
      lastName: string;
      status: boolean;
    };
  }

  interface User extends DefaultUser {
    id: number;
    login: string;
    role: UserRole;
    surname: string;
    firstName: string;
    lastName: string;
    status: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    login: string;
    surname: string;
    firstName: string;
    lastName: string;
    status: boolean;
  }
}
