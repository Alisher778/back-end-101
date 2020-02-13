import React, { PureComponent } from 'react';
import {
  PieChart, Pie, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = ['#00cb7a', '#ff0057', '#FFC107',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(name);
  return (
    <text x={x} y={y} fill="white" fontSize={25} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
      <tspan fill="white" fontWeight={700} x={x - 10} y={y + 25}>{name}</tspan>
    </text>
  );
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const data = Object.values(this.props.data)
    console.log(data);

    return (
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              // cx={200}
              // cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={5}
            >
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
