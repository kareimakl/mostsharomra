import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "https://crm-fatora.onrender.com/api";
// Define the API slice
export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
    }),
    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
    }),

    createService: builder.mutation({
      query: (newService) => ({
        url: "/services",
        method: "POST",
        body: newService,
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, updatedService }) => ({
        url: `/services${id}`,
        method: "POST",
        body: updatedService,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for the services
export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
} = servicesApi;

export default servicesApi;
