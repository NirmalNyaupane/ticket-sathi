"use client";
import { Toaster } from "@/components/ui/toaster";
import { API_BASE_URL } from "@/constants/config";
import DefaultLayout from "@/layout/DefaultLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";

const Provider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(() => new QueryClient())
  axios.defaults.baseURL = API_BASE_URL;
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>   
          <DefaultLayout>{children}</DefaultLayout>
          {/* <ReactQueryDevtools /> */}
        </ReduxProvider>
      </QueryClientProvider>

    </ApolloProvider>
  );
};

export default Provider;
