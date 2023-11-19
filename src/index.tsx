import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



let client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/.',
  cache: new InMemoryCache(),
});
// const client = ...

// const client = ...

// client
//   .query({
//     query: gql`
//     query ExampleQuery {
//       company {
//         ceo
//       }
//       roadster {
//         apoapsis_au
//       }
//       landpads {
//         wikipedia
//         status
//       }
//     }
//     `,
//   })
//   .then((result) => console.log(result));

  root.render(
    <React.StrictMode>
      <ApolloProvider client = {client}>
  
     
      <App />
      </ApolloProvider>
    </React.StrictMode>
  );
  
  