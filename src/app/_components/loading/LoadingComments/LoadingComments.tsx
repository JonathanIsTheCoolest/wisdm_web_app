import React from "react"

import LoadingSpinner from "../LoadingSpinner"
import styles from "@/app/_components/loading/LoadingComments/LoadingComments.module.scss"

interface LoadingCommentsProps {
  additionalText?: string
}

const LoadingComments: React.FC<LoadingCommentsProps> = ({
  additionalText
}) => {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner/>
      <br /><br/>
      Loading Comments...
      <br />
      {additionalText}
    </div>
  )
}

export default LoadingComments