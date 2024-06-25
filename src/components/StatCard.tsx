import React from "react";

function StatCard({
    text, amount
}:{
    text: string, amount: number
}) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{text}</div>
        <div className="stat-value">
            {amount}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
