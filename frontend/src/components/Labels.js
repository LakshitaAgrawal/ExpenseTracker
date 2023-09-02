import React from "react";
import { default as api } from "../store/ApiSlice";
import { getLabels } from '../helper/helper'

// const obj = [
//   {
//     type: "Savings",
//     color: "#f9c74f",
//     percent: 45,
//   },
//   {
//     type: "Investment",
//     color: "rgb(255, 99, 132)",
//     percent: 20,
//   },
//   {
//     type: "Expense",
//     color: "rgb(54, 162, 235)",
//     percent: 10,
//   },
// ];

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data, 'type').map((v, i) => (
      <LabelComponent key={i} data={v}></LabelComponent>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <>
      {Transactions}
    </>
  );
};

function LabelComponent({ data }) {
  if (!data) return <></>;
  const percent = typeof data.percent === 'number' ? Math.round(data.percent) : 0;

  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{percent}%</h3>
    </div>
  );
}

export default Labels;
