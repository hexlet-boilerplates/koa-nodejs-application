import crypto from 'crypto';

export const secret = 'abcdefg';

export const encrypt = value => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
