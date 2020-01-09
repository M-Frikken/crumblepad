import React from 'react';
import CustomizableLoader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/Loader.css";

const Loader = () => (
    <div className="Loader-wrapper">
        <CustomizableLoader
            className="Loader"
            type="BallTriangle"
            color="orange"
            height={50}
            width={50}
            timeout={10000}
        />
    </div>
);

export default Loader;