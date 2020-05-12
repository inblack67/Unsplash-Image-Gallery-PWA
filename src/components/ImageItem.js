import React from 'react'

const ImageItem = ({ image }) => {
    return (
        <div>
            <img src={image} alt="" className='responsive-img'/>
        </div>
    )
}

export default ImageItem
