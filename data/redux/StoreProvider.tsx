'use client';

import persistStore from 'redux-persist/es/persistStore';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

type StoreProviderType = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderType) => {
  const persist = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>{children}</PersistGate>
    </Provider>
  );
};

export default StoreProvider;
