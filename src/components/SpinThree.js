import React from "react";
import { Circles } from "react-loader-spinner";
const SpinThree = () => {
  return (
    <div>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default SpinThree;
