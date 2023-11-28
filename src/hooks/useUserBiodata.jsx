import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserBiodata = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data:biodata=[],isLoading} = useQuery({
        queryKey:['userBiodata',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/singleBiodata?email=${user?.email}`)
            return res?.data;
        }
    })
    return [biodata,isLoading]
};

export default useUserBiodata;