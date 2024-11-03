interface NestedThreadContainerProps {
  isCollapsed: boolean;
}

const NestedThreadContainer = (props: React.PropsWithChildren<NestedThreadContainerProps>) => {
  const { isCollapsed, children } = props;

  return (
    <div
      style={{
        overflow: 'hidden',
        maxHeight: isCollapsed ? '0' : '100%',
        opacity: isCollapsed ? 0 : 1,
        marginLeft: '50px',
        // marginLeft: '5%',
        transition: '1s ease',
      }}
    >
      {children}
    </div>
  );
};

export default NestedThreadContainer;