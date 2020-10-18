import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTwitterSquare);

const TWITTER_URL = "https://twitter.com/intent/tweet?text=";
const Footer = ({ selectSection, joke }) => {
    const shareOnTwitter = TWITTER_URL +  encodeURI(joke);
    return (
        <footer>
            <a href={shareOnTwitter} target="__blank">
                <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            <FontAwesomeIcon icon={faRedoAlt} onClick={() => selectSection()} />
        </footer>
    )
}

export default Footer
