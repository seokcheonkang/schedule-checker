const KEY = {
  // JWT_ACCESS_TOKEN_SECRET
  getJwtAccessTokenSecret: (NODE_ENV) => {
    let result = 'bgkdevops2';
    if (NODE_ENV === 'production') {
      result = 'bgkdevops2';
    }
    return result;
  },
  // DB_PASSWORD
  getDatabasePassword: (NODE_ENV) => {
    let result = 'bespin123';
    if (NODE_ENV === 'production') {
      result = 'bespin123';
    }
    return result;
  },
  // NODEMAILER_USER
  getNodeMailerUserName: (NODE_ENV) => {
    let result = 'idealful@gmail.com';
    if (NODE_ENV === 'production') {
      result = 'idealful@gmail.com';
    }
    return result;
  },
  // NODEMAILER_PASSWORD
  getNodeMailerUserPassword: (NODE_ENV) => {
    let result = 'aqtkyadqqarlakpg';
    if (NODE_ENV === 'production') {
      result = 'aqtkyadqqarlakpg';
    }
    return result;
  },
};

module.exports = KEY;
