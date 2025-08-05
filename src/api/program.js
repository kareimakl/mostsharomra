import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://crm-fatora.onrender.com/api";

export const program = createApi({
  reducerPath: "program",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Add Authorization token if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all faqs (GET)
    getFaqs: builder.query({
      query: () => "/programs",
    }),

    // Get a single faq by ID (GET)
    getFaqById: builder.query({
      query: (id) => `/programs/${id}`,
    }),

    // Create a new faq (POST)
    createFaq: builder.mutation({
      query: (newFaq) => ({
        url: "/programs",
        method: "POST",
        body: newFaq,
      }),
    }),

    // Update an existing faq (PUT)
    updateFaq: builder.mutation({
      query: ({ id, updatedFaq }) => ({
        url: `/programs/${id}`,
        method: "PUT",
        body: updatedFaq,
      }),
    }),

    // Delete a faq (DELETE)
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/programs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the hooks generated for the endpoints
export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = program;
