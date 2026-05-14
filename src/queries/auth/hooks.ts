import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authKeys } from './keys'
import { register, login, logout, getSession } from './service'
import type { RegisterParams, LoginParams } from './types'

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RegisterParams) => register(params),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.session(), data.user)
    },
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: LoginParams) => login(params),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.session(), data.user)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useSession = () => {
  const token = localStorage.getItem('caduceo_token')

  return useQuery({
    queryKey: authKeys.session(),
    queryFn: getSession,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}
