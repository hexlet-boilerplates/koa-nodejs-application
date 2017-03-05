import getUser from './User';

export default connect => ({
  User: getUser(connect),
});
