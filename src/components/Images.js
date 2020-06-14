import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import ImageItem from './ImageItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Images.css';
import Preloader from './Preloader'

const Images = () => {
    useEffect(() => {
        getImages();
        // eslint-disable-next-line
    },[])

    const[images, setImages] = useState([]);
    const count = 50;

    const getImages = async () => {
        try {
            const res = await axios(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&count=${count}`);
            const images = res.data.map(image => image.urls.full)
            setImages(images);  
            return res;  
        } catch (err) {
            console.error(err)
        }
    }

    const fetchFurther = async () => {
        try {
            const res = await getImages();

            const images = res.data.map(image => image.urls.full)

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

export default Images