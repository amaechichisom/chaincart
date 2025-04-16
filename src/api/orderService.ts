import { baseDomain } from "./BaseDomain";

export const orderService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    OrderAvailable: build.mutation({
      query: ({ productId, quantity }: { productId: string; quantity: number }) => ({
        url: "/order/available",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: (_, __, { productId }) => [
        { type: "Product", id: productId }, 
        { type: "Order" }
      ],
    }),

    OrderPaymentConfirm: build.mutation({
      query: ({ productId, quantity, transactionHash }: { productId: string; quantity: number; transactionHash: string }) => ({
        url: "/order/confirm",
        method: "POST",
        body: { productId, quantity, transactionHash },
      }),
      invalidatesTags: (_, __, { productId }) => [
        { type: "Product", id: productId }, 
        { type: "Order" },
        { type: "Cart" },
      ],
    }),
    UpdateOrderStatus: build.mutation({
      query: ({ orderId, status }:{orderId:string, status:"release" | "cancel"}) => ({
        url: `/order/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order", "Product"],
    }),
    // UpdateOrderStatus: build.mutation({
    //   query: ({ orderId, status,buyerAddress }:{orderId:string, status:"release" | "cancel",buyerAddress:string}) => ({
    //     url: `/order/escrow/${orderId}`, // `/api/order/${orderId}/escrow?state=${fundState}`,
    //     method: "PUT",
    //     body: { status ,buyerAddress},
    //   }),
    //   invalidatesTags: ["Order", "Product"],
    // }),

    OrderHistory: build.query({
      query: () => "/order",
      providesTags: ["Order"],
    }),

    UserOrder: build.query({
      query: () => "/order/user_order",
      providesTags: ["Order", "Product"],
    }),

    AllOrder: build.query({
      query: () => "/order/all",
      providesTags: ["Order", "Product"],
    }),

    AllUserOrder: build.query({
      query: (status?: string) => {
        const url = status ? `/order/all_user_order?status=${status}` : "/order/all_user_order";
        return url;
      },
      providesTags: ["Order"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useOrderAvailableMutation,
  useOrderPaymentConfirmMutation,
  useOrderHistoryQuery,
  useUserOrderQuery,
  useAllOrderQuery,
  useAllUserOrderQuery,
  useUpdateOrderStatusMutation
} = orderService;
