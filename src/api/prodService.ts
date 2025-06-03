import { baseDomain } from "./BaseDomain";

export const prodService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
    }),
    allProduct: build.query({
      query: ({ category }: { category?: string }) =>
        category ? `/product?category=${category}` : "/product",
      providesTags: ["Product", "Order"],
    }),

    getCategory: build.query({
      query: () => "/category",
    }),
    sellerProduct: build.query({
      query: () => "/product/seller_product",
      providesTags: ["Product"],
    }),
    SingleProduct: build.query({
      query: (id) => `/product/${id}`,
      providesTags: (_, __, id) => [{ type: "Product", id }],
    }),
    deleteProduct: build.mutation({
      query: ({ productId }: { productId: string }) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { productId }) => [
        { type: "Product", id: productId },
        { type: "Product" },
        { type: "Cart" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProductMutation,
  useAllProductQuery,
  useSingleProductQuery,
  useGetCategoryQuery,
  useSellerProductQuery,
  useDeleteProductMutation,
} = prodService;
