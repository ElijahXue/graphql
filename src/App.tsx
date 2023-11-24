import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { factory } from "typescript";
import { AddOrder } from "./components/AddOrder";
export type Order = {
  id: string;
  description: string;
  totalInCents: number;
};
export type Customers = {
  industry: string;
  id: string;
  name: string;
  orders: Order[];
};

// Define a type for the overall data structure
type QueryData = {
  customers: Customers[];
};

const GET_DATA = gql`
  query {
    customers {
      id
      name
      industry
      orders {
        id
        description
        totalInCents
      }
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery<QueryData>(GET_DATA);

  // useEffect(() => {
  //   console.log("data", data?.customers);
  // }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data &&
        data.customers.map((customer: Customers) => (
          <div key={customer.id}>
            <h2>
              Industry: {customer.industry} - Status: {customer.id}
              <a>Name:- {customer.name} </a>
            </h2>
            {/* Display orders for each customer */}
            <div>
              {customer.orders.map((order: Order) => {
                return (
                  <div key={order.id}>
                    <p>
                      Order ID: {order.id}, Description: {order.description},
                      Total Cost: $
                      {(order.totalInCents / 100).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                );
              })}
              <AddOrder customerID={customer.id} />
            </div>
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
  // useEffect(() => {
  //   console.log({ loading, error, data });
  //   console.log({
  //     createCustoerLoading,
  //     createCustoerError,
  //     createCustoerData,
  //   });
  // });

  return (
    <div className="App">
      <h1>Custormers </h1>

      <br />
      <DisplayLocations />
      <h3> Add a Customer: </h3>
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
          <label htmlFor="name">Name: </label>
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
          <label htmlFor="industry">Industry: </label>
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
