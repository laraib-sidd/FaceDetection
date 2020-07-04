import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img alt={"face"}
                src={imageUrl}
                width='500px'
                height='auto'
                id='inputimage'
                />
                <div className="bounding-box"
                style={{top: box.topRow, right: box.rightcol, bottom: box.bottomRow, left: box.leftcol}}
                />

            </div>
        </div>
    )
}

export default FaceRecognition;