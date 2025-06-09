import { Role } from '../../common/enums';

export type JwtPayload = {
  email: string;
  sub: string;
  role: Role | string
};

