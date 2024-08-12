import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'https://api.ecotracker.com'; // Replace with your actual API URL

export const useUserData = (userId) => {
  return useQuery({
    queryKey: ['userData', userId],
    queryFn: () => fetch(`${API_URL}/users/${userId}`).then(res => res.json()),
  });
};

export const useLogActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activityData) => 
      fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};

export const useSocialComparison = (userId) => {
  return useQuery({
    queryKey: ['socialComparison', userId],
    queryFn: () => fetch(`${API_URL}/social-comparison/${userId}`).then(res => res.json()),
  });
};

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => fetch(`${API_URL}/challenges`).then(res => res.json()),
  });
};
