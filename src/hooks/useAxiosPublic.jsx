import axios from "axios";

const instance = axios.create({
  baseURL: "https://matrimony-server-side-two.vercel.app/api",
});
const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
