import React from "react";
import "./TrendCard.css";
import { trendData } from "../../data/trendData";
const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>
      {trendData.map((trend, id) => {
        return (
          <div className="trend">
            <span>#{trend.name}</span>
            <span> {trend.shares} K shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
