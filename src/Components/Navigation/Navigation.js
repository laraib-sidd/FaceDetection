import React from 'react'

const Navigation = ({onRouteChange}) => {
        return (
            <div>
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
                </nav>
            </div>
        )
}

export default Navigation;