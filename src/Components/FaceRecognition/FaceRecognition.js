import React from 'react';

const FaceRecognition = ({imageUrl}) =>{
    return(
        <div className="center">
            <img alt={"face"} src={imageUrl}/>
        </div>
    )
}

export default FaceRecognition;