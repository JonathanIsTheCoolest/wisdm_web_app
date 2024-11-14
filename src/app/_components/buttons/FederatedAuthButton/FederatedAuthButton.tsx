import Image from "next/image"

import styles from '@/app/_components/buttons/FederatedAuthButton/FederatedAuthButton.module.scss'

interface FederatedAuthButtonProps {
  src: string;
  alt: string;
  text: string;
  onClick: () => void;
}

const FederatedAuthButton = ({
  src,
  alt,
  text,
  onClick
}: FederatedAuthButtonProps) => {
  return (
    <button
    className={styles.authButton}
    onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
      />
      {text}
    </button>
  )
}

export default FederatedAuthButton