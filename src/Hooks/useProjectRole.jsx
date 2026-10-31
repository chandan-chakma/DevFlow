import { useQuery } from '@tanstack/react-query';
import UseAxiosSecures from './UseAxiosSecures.jsx';
import useUserRole from './useUserRole.jsx';

const useProjectRole = (projectId) => {
    const axiosSecure = UseAxiosSecures();
    const { role: userRole, isLoading: userRoleLoading } = useUserRole();

    const {
        data: role = null,
        isLoading: projectRoleLoading,
        refetch
    } = useQuery({
        queryKey: ['projectRole', projectId],

        queryFn: async () => {
            const res = await axiosSecure.get(
                `/project-members/${projectId}/role`
            );

            return res.data.role;
        },

        enabled: !!projectId && userRole !== 'admin'
    });

    const isAdmin = userRole === 'admin';
    const isManager = role === 'manager';
    const isMember = role === 'member';

    const permissions = {
        isAdmin,
        isManager,
        isMember,

        canCreateTask: isAdmin || isManager,
        canEditTask: isAdmin || isManager,
        canDeleteTask: isAdmin || isManager,
        canAssignTask: isAdmin || isManager,
        canAddMember:isAdmin || isManager,
    };

    return {
        role,
        userRole,
        isLoading: userRoleLoading || (!isAdmin && projectRoleLoading),
        refetch,
        permissions
    };
};

export default useProjectRole;