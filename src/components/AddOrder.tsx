import { useState } from "react";
import { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
export type AppProps = {
  customerID: number;
};

const MUTATE_DATA = gql`
  mutation MUTATE_DATE(
    $customer: ID!
    $description: String!
    $totalInCents: Float!
  ) {
    createOrder(
      customer: $customer
      description: $description
      totalInCents: $totalInCents
    ) {
      order {
        id
        customer {
          id
        }
        description
        totalInCents
      }
    }
  }
`;
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

export function AddOrder({ customerID }: any) {
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState<number>(NaN);

  const [
    createOrder,
    {
      loading: createOrderLoading,
      error: createOrderError,
      data: createOrderData,
    },
  ] = useMutation(MUTATE_DATA, {
    refetchQueries: [
      GET_DATA, // DocumentNode object parsed with gql
    ],
  });

  useEffect(() => {
    if (createOrderData) {
      setDescription("");
      setTotal(NaN);
    }
  }, [createOrderData]);

  return (
    <div>
      {active ? null : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setActive(true);
          }}
        >
          {" "}
          + New Order for: {customerID}{" "}
        </button>
      )}
      {active ? (
        <div>
          {" "}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createOrder({
                variables: {
                  customer: customerID,
                  description: description,
                  totalInCents: total * 100,
                },
              });
            }}
          >
            <div>
              <label htmlFor="description">Description: </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  e.preventDefault();
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="total">Total: </label>
              <input
                id="total"
                type="number"
                value={isNaN(total) ? "" : total} // protection for the warning
                onChange={(e) => {
                  e.preventDefault();
                  const value = e.target.value;
                  setTotal(parseFloat(value));
                }}
              />
            </div>
            {/* <button disabled={createOrderLoading ? true : false}>
              Add customer
            </button>
            {createOrderError ? <p>Error createOrderError </p> : null} */}
            <button disabled={createOrderLoading ? true : false}>
              Add order
            </button>
          </form>
          {createOrderError ? <p>Something went wrong </p> : null}
        </div>
      ) : null}
    </div>
  );
}
