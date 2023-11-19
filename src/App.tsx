import { useEffect } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';

type Company = {
  ceo: string;
};

type Roadster = {
  apoapsis_au: number;
};

type Landpad = {
  wikipedia: string;
  status: string;
  id: string;
  full_name: string;
};

// Define a type for the overall data structure
type QueryData = {
  company: Company;
  roadster: Roadster;
  landpads: Landpad[];
};

const GET_DATA = gql`
query ExampleQuery {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
  landpads {
    wikipedia
    status
    id
    full_name
  }
}
`


function DisplayLocations() {
  const { loading, error, data } = useQuery<QueryData>(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data && data.landpads.map((landpad) => (
        <div key={landpad.id}>
          <p>{landpad.full_name} - Status: {landpad.status}</p>
        
          <a href={landpad.wikipedia}>Wikipedia</a>
          <p>{data?.company.ceo}</p>
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
