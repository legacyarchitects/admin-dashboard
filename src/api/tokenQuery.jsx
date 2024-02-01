import { useQuery } from 'react-query';
import { useAuth } from "@clerk/clerk-react";

export function useAuthenticatedQuery(queryKey, path, config) {
    const { getToken } = useAuth();

    return useQuery(queryKey, async () => {
        const token = await getToken({ template: 'api-gateway' });
        const response = await fetch(`${config.API_ENDPOINT}${path}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response error');
        }

        const json = await response.json();
        return json.body;
    });
}
