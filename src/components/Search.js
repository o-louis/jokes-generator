import React from 'react'

const Search = ({ input, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                text="type"
                placeholder="Search a text..."
                value={input} onChange={e => handleChange(e)}
            />
            <button type="submit"></button>
        </form>
    )
}

export default Search
