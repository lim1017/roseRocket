import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const PieChart1 = ({ taskBreakdown }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    setTasks({
      Pickup: taskBreakdown[0] ? taskBreakdown[0].Pickup : 0,
      Dropoff: taskBreakdown[0] ? taskBreakdown[0].Dropoff : 0,
      Other: taskBreakdown[0] ? taskBreakdown[0].Other : 0,
    });
  }, [taskBreakdown]);

  const data = [
    {
      name: "Pickup",
      value: tasks.Pickup,
    },
    {
      name: "Dropoff",
      value: tasks.Dropoff,
    },
    {
      name: "Other",
      value: tasks.Other,
    },
  ];

  const COLORS = ["#C24602", "#007571", "#52C2BF"];

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "5em" }}
    >
      <PieChart width={730} height={450}>
        <Tooltip
          itemStyle={{ color: "#e7e7e7" }}
          contentStyle={{ backgroundColor: "#272727" }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend align="center" verticalAlign="bottom" iconSize={20} />
      </PieChart>
    </div>
  );
};

export default PieChart1;
