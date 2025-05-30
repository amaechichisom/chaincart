
class AuthStore {
    static getAccessToken(key:string='auth'):string| null {
      return localStorage.getItem(key);
    }
  
    static setAccessToken(token: string,key:string='auth') {
      localStorage.setItem(key, token);
    }
  
    static removeAccessToken(key:string='auth'): void {
      localStorage.removeItem(key);
    }
  
    static getRefreshToken():string| null {
      return localStorage.getItem('refreshToken');
    }
  
    static setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }
  
    static removeRefreshToken(key:string='refreshToken'): void {
      localStorage.removeItem(key);
    }
  }
  
  export default AuthStore;