import React from 'react';
import { SafeAreaView } from 'react-native';
import GoogleSheet from './src/screens/googleSheet';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <GoogleSheet />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
