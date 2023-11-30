import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { loggedOut } = useAuth();
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      console.log(error);
      const status = error.response.status;
      if (status == 401 || status === 403) {
        await loggedOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
