import { useQuery } from '@tanstack/react-query';
import UseAxiosSecures from './UseAxiosSecures.jsx';
const useUserRole = () => {
    const axiosSecure = UseAxiosSecures();

    const { data: role = 'user', isLoading, refetch } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/role');
            return res.data.role||'user';
        }
    });

    return { role, isLoading, refetch };
};

export default useUserRole;