'use client';

import { QueryClientProvider, QueryClient } from 'react-query';

type QryClientType = {
  children: React.ReactNode;
};

const QryProvider = ({ children }: QryClientType) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QryProvider;
