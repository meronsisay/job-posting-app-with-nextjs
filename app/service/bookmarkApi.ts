import { BookmarkedJob, Data, JobPost } from "@/type/job";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarks",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    getBookmarks: builder.query<BookmarkedJob[], { token: string | null }>({
      query: ({ token }) => ({
        url: "/bookmarks",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: {
        success: boolean;
        data: BookmarkedJob[];
      }) => response.data,
    }),
    addBookmark: builder.mutation<any, { eventID: string; token: string }>({
      query: ({ eventID, token }) => ({
        url: `/bookmarks/${eventID}`,
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: Data) => response.data,
    }),
    removeBookmark: builder.mutation<any, { eventID: string; token: string }>({
      query: ({ eventID, token }) => ({
        url: `/bookmarks/${eventID}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
