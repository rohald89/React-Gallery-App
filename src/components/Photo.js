import React from 'react';

const Photo = ( { photo} ) => (
    <li>
        <img src={`https://live.staticflickr.com/${photo.server}/${photo.farm}/${photo.id}_${photo.secret}.jpg`} alt="" />
    </li>
)

export default Photo;