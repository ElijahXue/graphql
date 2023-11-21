import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { factory } from "typescript";

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
  query {
    allcustomers {
      industry
      id
      name
      __typename
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery<QueryData>(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data &&
        data.allcustomers.map((allcustomer) => (
          <div key={allcustomer.id}>
            <p>
              Industry: {allcustomer.industry} - Status: {allcustomer.id}
            </p>

            <a>Name:- {allcustomer.name} </a>
            {/* <a href={allcustomer.name}>Name</a> */}
            {/* <p>{data?.allcustomer.ceo}</p> */}
          </div>
        ))}
    </div>
  );
}

const MUTATE_DATA = gql`
  mutation MUTATE_DATE($name: String!, $industry: String!) {
    createCustomer(name: $name, industry: $industry) {
      customer {
        industry
        id
        name
      }
    }
  }
`;

function App() {
  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DATA);
  const [
    createCustomer,
    {
      loading: createCustoerLoading,
      error: createCustoerError,
      data: createCustoerData,
    },
  ] = useMutation(MUTATE_DATA, {
    refetchQueries: [
      GET_DATA, // DocumentNode object parsed with gql
    ],
  });
  useEffect(() => {
    console.log({ loading, error, data });
    console.log({
      createCustoerLoading,
      createCustoerError,
      createCustoerData,
    });
  });

  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>

      <br />
      <DisplayLocations />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitting..");
          console.log(name, industry);
          createCustomer({ variables: { name: name, industry: industry } });
          if (!error) {
            setIndustry("");
            setName("");
          }
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
            }}
          />
        </div>
        <button disabled={createCustoerLoading ? true : false}>
          Add customer
        </button>
        {createCustoerError ? <p>Error createCustoerError </p> : null}
      </form>
    </div>
  );
}

export default App;
