import React, { Component, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import axios from "axios";

const Dashboard = () => {
  useEffect(() => {
    const chart = c3.generate({
      bindto: "#chart",
      data: {
        x: "x",
        columns: [["x"], ["sales"]],
        types: {
          sales: "bar",
        },
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
          },
        },
      },
    });

    (async () => {
      const { data } = await axios.get("chart");

      chart.load({
        columns: [
          ["x", ...data.map((r: any) => r.date)],
          ["sales", ...data.map((r: any) => r.sum)],
        ],
      });
    })();
  });

  return (
    <Wrapper>
      <h2>Daily sales</h2>

      <div id="chart" />
    </Wrapper>
  );
};

export default Dashboard;
