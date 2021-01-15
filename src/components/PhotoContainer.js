import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
    const results = props.data;
    let images;

    if(props.match && props.query !== props.match.params.query){
        props.search(props.match.params.query);
        images = results.map(image => <Photo photo={image} key={image.id} /> );
    }

    if(results.length > 0){
        images = results.map(image => <Photo photo={image} key={image.id} /> );
    } else {
        images = <NotFound />
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                { images }
            </ul>
       </div>
    )
}

export default PhotoContainer;