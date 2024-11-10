import React from "react";
import styles from "./Quadrant.module.scss";

interface QuadrantProps {
  xValue: number;
  yValue: number;
}

const Quadrant: React.FC<QuadrantProps> = ({ xValue, yValue }) => {
  const dotStyle = {
    left: `${xValue * 100}%`,
    bottom: `${yValue * 100}%`,
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.quadrantWrapper}>
        <div className={styles.topLabel}>Teacher's Pet</div>

        <div className={styles.horizontalLabels}>
          <div className={styles.leftLabel}>Left</div>
          <div className={styles.quadrantContainer}>
            <div className={styles.gradientBackground}></div>

            <div className={styles.gradientAxes}>
              <div className={styles.xAxis}></div>
              <div className={styles.yAxis}></div>
            </div>

            <div className={styles.gradientDot} style={dotStyle}></div>
          </div>
          <div className={styles.rightLabel}>Right</div>
        </div>

        <div className={styles.bottomLabel}>Doom Troll</div>
      </div>
    </div>
  );
};

export default Quadrant;
