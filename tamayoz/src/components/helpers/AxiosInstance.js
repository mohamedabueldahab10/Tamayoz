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
    console.log('authedUser Acess Token', AccessToken);
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
// import axios from 'axios';
// import { handleLogout } from '../../redux/authReducer';
// import i18next from 'i18next';
// import { useDispatch } from 'react-redux';

// const AuthedUser = JSON.parse(localStorage.getItem('AuthedUser'));
// const { language } = i18next;
// const baseURL = 'http://168.119.12.58/';

// const once = (fn) => {
//   let called = false;
//   return function (...args) {
//     if (!called) {
//       called = true;
//       return fn.apply(this, args);
//     }
//   };
// };

// const axiosInstance = (() => {
//   const dispatch = useDispatch();
//   if (AuthedUser) {
//     const AccessToken = AuthedUser?.token;
//     const instance = axios.create({
//       baseURL,
//       headers: {
//         Authorization: `Bearer ${AccessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const handleErrorResponse = once(() => {
//       dispatch(handleLogout());
//     });

//     instance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response) {
//           const { status, data } = error.response;
//           console.error(`Error ${status}:`, data);

//           switch (status) {
//             case 400:
//               console.error('Bad Request:', data);
//               break;
//             case 401:
//               handleErrorResponse();
//               break;
//             case 403:
//               console.error('Forbidden:', data);
//               break;
//             case 404:
//               console.error('Not Found:', data);
//               break;
//             case 500:
//               console.error('Internal Server Error:', data);
//               break;
//             default:
//               console.error('Unhandled error:', data);
//           }
//         } else if (error.request) {
//           console.error('No response received:', error.request);
//         } else {
//           console.error('Error setting up request:', error.message);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return instance;
//   } else {
//     return axios.create({
//       baseURL,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// })();

// export default axiosInstance;
