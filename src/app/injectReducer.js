import hoistNonReactStatics from "hoist-non-react-statics";
import React from "react";
import { ReactReduxContext } from "react-redux";

import getInjectors from "./reducerInjectors";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ key, reducer }) =>
  (WrappedComponent) => {
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withReducer(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      })`;

      constructor(props, context) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };

const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useInjectReducer };
