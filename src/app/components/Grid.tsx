"use client"
import React from "react";
import GridLayout from "react-grid-layout";
import { Component as BarChart } from './BarChart';
import { Component as PieChart } from './PieChart';
import { Component as AreaChart } from './AreaChart';
import { Component as BarChartInteractive } from './BarChartInteractive';

export class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "b", x: 0, y: 0, w: 4, h: 8 },
      { i: "c", x: 4, y: 0, w: 4, h: 8 },
      { i: "d", x: 8, y: 0, w: 4, h: 8 },
      { i: "e", x: 9, y: 1, w: 16, h: 8 }
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="b" ><PieChart /></div>
        <div key="d" ><AreaChart /></div>
        <div key="c" ><BarChart /></div>
        <div key="e" ><BarChartInteractive /></div>
      </GridLayout>
    );
  }
}