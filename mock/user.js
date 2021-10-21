const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
};

const users = {
  'admin-token': {
    roles: ['admin'],
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    name: 'Normal Editor',
  },
};

export default [
  // user login
  {
    url: '/api/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        };
      }

      return {
        code: 200,
        data: token,
      };
    },
  },

  // get user info
  {
    url: '/api/info',
    type: 'get',
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        };
      }

      return {
        code: 200,
        data: info,
      };
    },
  },

  // user logout
  {
    url: '/api/logout',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success',
      };
    },
  },
];
