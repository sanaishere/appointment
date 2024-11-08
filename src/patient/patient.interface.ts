import { createUnionType, InterfaceType } from '@nestjs/graphql';
import { UserRole } from 'src/auth/models/user.model';

export interface Ipatient {
  _id?: any;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  roles: UserRole[];
  illness: string;
  caseNumber: number;
}
