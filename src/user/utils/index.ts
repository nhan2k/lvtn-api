import * as crypto from 'crypto';

export function generateOTP(): string {
  const otpLength = 6;
  const digits = '0123456789';

  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits.charAt(randomIndex);
  }

  return otp;
}
