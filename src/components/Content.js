import React from 'react'

const Content = ({ joke, section }) => {
    return (
        <div className="infos">
            <h1 className="title">Chuck Norris Jokes</h1>
            <p className="section">{section}</p>
            <p className="joke">{joke}</p>
        </div>
    )
}

export default Content
