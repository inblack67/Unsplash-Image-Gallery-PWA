import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import ImageItem from './ImageItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Images.css';
import Preloader from './Preloader'

const Pexels = () => {

    useEffect(() => {
        getImages();
        // eslint-disable-next-line
    },[])

    const[images, setImages] = useState([]);

    const getImages = async (page=2) => {
        try {
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: process.env.REACT_APP_PEXELS,
                }
            }
            const res = await axios.get('https://api.pexels.com/v1/curated', config);

            const images = res.data.photos.map(photo => photo.url);
            setImages(images);

        } catch (err) {
            console.error(err)
        }
    }

    const fetchFurther = async () => {
        try {
            let count = 0;
            const images = getImages(count++);
            setImages(images.concat(images));   
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <InfiniteScroll dataLength={images.length} next={fetchFurther} hasMore={true} loader={<Preloader />}>
        <div className='images'>
            <Fragment>
                { images && images.map((image, index) => <ImageItem image={image} key={index} />) }
            </Fragment>
        </div>
        </InfiniteScroll>
    )
}

export default Pexels


// import React, { useEffect } from 'react'
// import axios from 'axios'

// const Pexels = () => {

//     useEffect(() => {
//         getImages();
//     },[])

//     const getImages = async () => {
        // const config = {
        //     headers: {
        //         Authorization: process.env.REACT_APP_PEXELS
        //     }
        // }
        // const res = await axios.get('https://api.pexels.com/v1/curated', config);
        // console.log(res.data);
//     }

//     return (
//         <div>

//         </div>
//     )
// }

// export default Pexels
