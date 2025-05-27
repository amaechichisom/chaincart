
class AuthStore {
    static getAccessToken(key:string='auth'):string| null {
      return localStorage.getItem(key);
    }
  
    static setAccessToken(token: string,key:string='auth') {
      localStorage.setItem(key, token);
    }
  
    static removeAccessToken(): void {
      localStorage.removeItem('auth');
    }
  
    static getRefreshToken():string| null {
      return localStorage.getItem('refreshToken');
    }
  
    static setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }
  
    static removeRefreshToken(): void {
      localStorage.removeItem('refreshToken');
    }
  }
  
  export default AuthStore;