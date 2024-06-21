import React from 'react'
import './style.scss';

const Thumbnail = ({ imageUrl, title }) => {
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 mb-4'>
            <div className='zoom-blur'>
                <img src={imageUrl} alt="Another Image zoom-on-hover effect" />
                <h5 className='title text-center p-2'>
                    {title}
                </h5>
            </div>
        </div>
    )
}

export default Thumbnail;
