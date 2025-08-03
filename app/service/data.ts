import { Data, JobPost } from "@/type/job";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPostApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    
    getJobPosts: builder.query<JobPost[], void>({
      query: () => "/opportunities/search",
      transformResponse: (response: Data) => response.data,
    }),

    getSinglePost: builder.query<JobPost, string>({
      query: (id) => `/opportunities/${id}`,
      transformResponse: (response: { success: boolean; data: JobPost }) =>
        response.data,
    }),
  }),
});

export const { useGetJobPostsQuery, useGetSinglePostQuery } = jobPostApi;
