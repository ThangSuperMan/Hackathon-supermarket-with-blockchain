import React from "react";

interface Props {
  children: React.ReactElement;
}

const Providers = ({ children }: Props) => {
  console.log("rendering the Providers component");
  return <div className="providers">{children}</div>;
};

export default Providers;
