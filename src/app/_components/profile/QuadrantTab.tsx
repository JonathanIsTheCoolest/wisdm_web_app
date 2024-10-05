import React from "react";
import styles from "@/styles/components/profile/QuadrantTab.module.scss";
import Image from "next/image";

const Quadrant: React.FC = () => {
  return (
    <div className={styles.quadrant}>
      <div className={styles.quadrantImage}>
        <Image
          src="/assets/icons/quadrant.svg"
          alt="Quadrant"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Additional content can be added here */}
    </div>
  );
};

export default Quadrant;