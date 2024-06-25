import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtTemporarySecret: process.env.JWT_TEMPORARY_SECRET,
  verifyCodeSecret: process.env.VERIFY_CODE_SECRET,
}));
