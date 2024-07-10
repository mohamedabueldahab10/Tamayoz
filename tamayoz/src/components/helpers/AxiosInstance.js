import axios from 'axios';
import { handleLogout } from '../../redux/authReducer';
import i18next from 'i18next';
export default function AxiosInstance() {
  const AuthedUser = JSON.parse(localStorage.getItem('AuthedUser'));
  const { language } = i18next;
  const baseURL = 'http://168.119.12.58/';
  let instance;
  console.log('authedUser instance', AuthedUser);
  if (AuthedUser) {
    const AccessToken = AuthedUser?.token;
    instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json',
        // 'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        function once(fn, context) {
          var result;
          return function () {
            if (fn) {
              result = fn.apply(context || this, arguments);
              fn = null;
            }

            return result;
          };
        }
        console.log('Axios ERR', error);
        if (error.response.status === 401) {
          once(function () {
            handleLogout();
          })();
        }
        // Usage
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
    return instance;
  } else {
    instance = axios.create({
      baseURL,
    });
    return instance;
  }
}
