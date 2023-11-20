import { useEffect } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';



type Allcustomers = {
  industry: string;
  id: string;
  name: string;
  __typename: string;
};

// Define a type for the overall data structure
type QueryData = {
 
  allcustomers: Allcustomers[];
};

const GET_DATA = gql`
query{
  allcustomers{
     industry
     id
     name
     __typename
   }
 }
`


function DisplayLocations() {
  const { loading, error, data } = useQuery<QueryData>(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      
      {data && data.allcustomers.map((allcustomer) => (
        <div key={allcustomer.id}>
          <p>Industry: {allcustomer.industry} - Status: {allcustomer.id}</p>

          <a >Name:- {allcustomer.name} </a>
          {/* <a href={allcustomer.name}>Name</a> */}
          {/* <p>{data?.allcustomer.ceo}</p> */}
        </div>
      ))}
      
    </div>
  );
}


function App() {
  const { loading, error, data } = useQuery(GET_DATA);
  useEffect(() => {
    console.log({ loading, error, data })

  })

  return (

    <div className="App">
      <h2>My first Apollo app 🚀</h2>


      <br />
      <DisplayLocations />
    </div>
  );
}

export default App;
