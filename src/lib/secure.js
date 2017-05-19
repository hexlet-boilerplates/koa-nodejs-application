import crypto from 'crypto';

const secret = 'abcdefg';

export default value => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
