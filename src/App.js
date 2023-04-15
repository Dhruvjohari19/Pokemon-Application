import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import HomeScreen from './Screens/HomeScreen';
import DetailScreen from './Screens/DetailScreen';
import {BrowserRouter, Route,Router, Routes } from 'react-router-dom';



function App() {
  return (
    <ApolloProvider client={client}>
     <BrowserRouter>
      <Routes>
      <Route  path="/" Component={HomeScreen} />
      <Route  path="/pokemon/:id" Component={DetailScreen} />
      </Routes>
      </BrowserRouter>

    </ApolloProvider>
  );
}

export default App;


