import styles from '@/src/app/_components/comments/NestedThreadContainer/NestedThreadContainer.module.scss'

interface NestedThreadContainerProps {
  isCollapsed: boolean;
}

const NestedThreadContainer = (props: React.PropsWithChildren<NestedThreadContainerProps>) => {
  const { isCollapsed, children } = props;

  return (
    <div
      className={styles.nestedThreadContainer}
      style={{
        maxHeight: isCollapsed ? '0' : '100%',
        opacity: isCollapsed ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
};

export default NestedThreadContainer;