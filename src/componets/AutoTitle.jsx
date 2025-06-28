// src/utils/AutoTitle.jsx
import { useEffect } from 'react';

const AutoTitle = (Component) => {
  const WrappedComponent = (props) => {
    useEffect(() => {
      const name = Component.name;
      const formatted = name.replace(/([A-Z])/g, ' $1').trim(); // Optional formatting
      document.title = `${formatted} | My Website`;
    }, []);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default AutoTitle;
