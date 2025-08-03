import { configureStore } from "@reduxjs/toolkit";
import { jobPostApi } from "./service/data";

import { bookmarkApi } from "./service/bookmarkApi";
export const store = configureStore({
  reducer: {
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [jobPostApi.reducerPath]: jobPostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobPostApi.middleware)
      .concat(bookmarkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
