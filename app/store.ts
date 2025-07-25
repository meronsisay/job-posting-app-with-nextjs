import { configureStore } from "@reduxjs/toolkit";
import { jobPostApi} from "./service/data"
export const store = configureStore({
  reducer: {
    [jobPostApi.reducerPath]: jobPostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobPostApi.middleware),
});
