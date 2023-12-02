import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data:isAdmin,isPending:isAdminLoading} = useQuery({
      enabled:!!user?.email,
      queryKey:['isAdmin',user?.email],
      queryFn:async()=>{
          const res = await axiosSecure.get(`/users/admin?email=${user?.email}`)
          return res.data?.admin;
      }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;