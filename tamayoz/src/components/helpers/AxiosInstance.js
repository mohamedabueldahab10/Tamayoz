import axios from "axios";
import { handleLogout } from "../redux/actions/shared";
import i18next from "./i18n";
import store from "../redux/store";
export default function axiosInstance() {
  const CompanyData = JSON.parse(localStorage.getItem("CompanyData"));
  const AuthedUser = JSON.parse(localStorage.getItem("AuthedUser"));
  const { language } = i18next;
  const { APIHost, APIPath } = CompanyData;
  const baseURL = `${APIHost}${APIPath}api/ClientUsers/V6`;
  let instance;
  console.log(AuthedUser);
  if (CompanyData) {
    const AccessToken = AuthedUser?.AccessToken;
    const { ClientID } = CompanyData;
    instance = axios.create({
      baseURL: "https://vsoft.com-eg.net:4041",
      headers: {
        AccessToken: AccessToken,
        "Accept-Encoding": "gzip, deflate, br",
        CompanyID: ClientID,
        Language: language,
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
        if (error.response.status === 401) {
          once(function () {
            store.dispatch(handleLogout());
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
