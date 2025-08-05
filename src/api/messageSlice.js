import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "https://crm-fatora.onrender.com";

export const messageApi = createApi({
  reducerPath: "messageApi",
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
    // get all messages
    getMessages: builder.query({
      query: () => "/messages",
    }),
    // get message by id
    getMessageById: builder.query({
      query: (id) => `/show-message/${id}`,
    }),
    // create new message
    createMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/add-message",
        method: "POST",
        body: newMessage,
      }),
    }),
    // update message
    updateMessage: builder.mutation({
      query: ({ id, ...updatedMessage }) => ({
        url: `/update-message/${id}`,
        method: "PUT",
        body: updatedMessage,
      }),
    }),
    // delete message
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/delete-message/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
