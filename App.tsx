import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import InitApp from './InitApp';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export default function App() {
  console.log('app')
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <InitApp />
        </QueryClientProvider>
      </NavigationContainer>
    </>
  )
}

