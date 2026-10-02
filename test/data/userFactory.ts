import { randomBytes } from 'crypto';

export interface UserData {
  email: string;
  password: string;
}

const uniqueId = () => randomBytes(4).toString('hex');

export const buildValidUser = (overrides: Partial<UserData> = {}): UserData => ({
  email: `user.${uniqueId()}@example.com`,
  password: 'Password123!',
  ...overrides,
});

export const buildUserWithInvalidEmail = (): UserData => buildValidUser({ email: 'user@com' });

export const buildUserWithShortPassword = (): UserData => buildValidUser({ password: 'Pass1!' });
