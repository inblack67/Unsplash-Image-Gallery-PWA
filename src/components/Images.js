import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Fragment } from 'react';
import ImageItem from './ImageItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Images.css';
import Preloader from './Preloader'

const Images = () => {

    document.cookie = 'SameSite=None Secure';

    useEffect(() => {
        getImages();
        // eslint-disable-next-line
    },[])

    const[images, setImages] = useState([]);

    const getImages = async () => {

        const res = await axios(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&count=30`);
        const images = res.data.map(image => image.urls.full)
        setImages(images);
    }

    const fetchFurther = async () => {
        const res = await axios(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&count=${30}`);
        const moreImages = res.data.map(image => image.urls.full)
        setImages(images.concat(moreImages));
    }


    if(!images){
        return <Preloader />
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