import Cookies from 'js-cookie';

class Auth {
  constructor() {
    this.authenticated = false;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logout(cb) {
    this.authenticated = false;
    Cookies.remove('token');
    cb();
  }
  isAuthenticated() {
    if (this.authenticated) return true;
    else {
      const token = Cookies.get('token');
      if (token) {
        try {
          JSON.parse(atob(token.split('.')[1])).id
            ? (this.authenticated = true)
            : (this.authenticated = false);
          return this.authenticated;
        } catch (err) {
          console.log(`Couldnt parse the payload: ${err}`);
        }
      } else {
        return this.authenticated;
      }
    }
  }
}

export default new Auth();
