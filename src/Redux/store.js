import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiService } from "../api/userSlice";
import { countriesApi } from "../api/countriesSlice";
import servicesApi from "../api/servicesSlice";
import { messageApi } from "../api/messageSlice";
import { transactionsApi } from "../api/transactionsSlice";
import { bookingsApi } from "../api/bookingSlice";
import { faqApi } from "../api/faqSlice";
// import { userApi, authReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [faqApi.reducerPath]:faqApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiService.middleware,
      countriesApi.middleware,
      servicesApi.middleware,
      messageApi.middleware,
      transactionsApi.middleware,
      bookingsApi.middleware,
      faqApi.middleware
    ),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
