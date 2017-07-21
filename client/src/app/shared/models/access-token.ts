import {
  Account,
} from './account';

export interface AccessToken {
  id: string;
  ttl: number;
  user: Account;
  userId: string;
}
