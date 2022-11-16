import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

export default function BarChartCard({ options, data }) {
  return (
    <div className="h-96 w-full">
      <Bar
        options={options}
        data={{
          labels: data.map((item) => item.meetup_date.split("T")[0]),
          datasets: [
            {
              label: "Pending Meetups",
              data: data.map((item) => item.total),
              backgroundColor: "rgb(255, 68, 51)",
              scales: {
                xAxes: [
                  {
                    barThickness: 1,
                    maxBarThickness: 2,
                  },
                ],
                yAxes: [
                  {
                    barThickness: 1,
                    maxBarThickness: 2,
                  },
                ],
              },
            },
          ],
        }}
      />
      ;
    </div>
  );
}
