import React from 'react';

const FaceRecognition = ({imageUrl}) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img alt={"face"}
                src={imageUrl}
                width='500px'
                height='auto'
                id='inputimage'
                />
            </div>
        </div>
    )
}

export default FaceRecognition;