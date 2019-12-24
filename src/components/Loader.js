import React from 'react';
import CustomizableLoader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = () => (
    <CustomizableLoader
        type="BallTriangle"
        color="orange"
        height={60}
        width={60}
        timeout={3000}
    />
);

export default Loader;