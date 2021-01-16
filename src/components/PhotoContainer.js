import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
    const results = props.data;
    let images;

    // make sure that the current url is the same as the search query when going back and forth in the history
    // if it isn't get new images
    if(props.match && props.query !== props.match.params.query){
        props.search(props.match.params.query);
    }else if(results.length > 0){
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