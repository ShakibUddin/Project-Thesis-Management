import React from "react";
import { Bar } from "react-chartjs-2";

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
                    barPercentage: 0.1,
                  },
                ],
                yAxes: [
                  {
                    barPercentage: 0.1,
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
