import crypto from 'crypto';

const secret = 'abcdefg';

export const encrypt = value => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
