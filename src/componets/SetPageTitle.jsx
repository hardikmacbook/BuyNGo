import { useEffect } from "react";

const SetPageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // Yeh component UI me kuch render nahi karega
};

export default SetPageTitle;
