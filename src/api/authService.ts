import { baseDomain } from "./BaseDomain";


export const authService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    walletAuth: build.mutation({
      query: ({ walletAddress }: { walletAddress: string }) => ({
        url: '/wallet',
        method: 'POST',
        body: { walletAddress },
      }),
    }),
    authRegister: build.mutation({
      query: ({ email,password }: { email: string;password:string }) => ({
        url: '/register',
        method: 'POST',
        body: { email,password },
      }),
    }),
    authLogin: build.mutation({
      query: ({ email,password }: { email: string;password:string }) => ({
        url: '/login',
        method: 'POST',
        body: { email,password },
      }),
    }),
    authUpdate :build.mutation({
      query:({email, phoneNumber, name})=>({
        url:'/profile',
        method:'PATCH',
        body:{email,phoneNumber,name}
      })
    })
    
    
  }),
  
  overrideExisting: false,
});

export const {useWalletAuthMutation,useAuthRegisterMutation,useAuthLoginMutation,useAuthUpdateMutation } = authService;
