const apiList = {
  getAllUsers: 'https://api.github.com/users',
  getUsersByName: 'https://api.github.com/search/users?q=:string',
  getUserData: 'https://api.github.com/users/:name',
  getReposByUser: 'https://api.github.com/users/:username/repos',
  getSubsByUser: 'https://api.github.com/users/:username/subscriptions',
};

export default apiList;
