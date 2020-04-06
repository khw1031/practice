import React from "react";

function Loading() {
  return <div>Loading...</div>;
}

type WithLoadingType = {
  isLoading?: boolean;
};

function withLoading<T>(Component: React.ComponentType<T>) {
  // return class extends React.Component<T & WithLoadingType> {
  //   render() {
  //     const { isLoading } = this.props;
  //     return isLoading ? <Loading /> : <Component {...this.props} />;
  //   }
  // };
  return (props: T & WithLoadingType) => {
    return props.isLoading ? <Loading /> : <Component {...props} />;
  };
}

export { Loading, withLoading };
