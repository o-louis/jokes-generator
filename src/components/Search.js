import React from 'react'

const Search = ({ input, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                text="type"
                placeholder="Search a word..."
                value={input} onChange={e => handleChange(e)}
            />
            <button type="submit">Go</button>
        </form>
    )
}

export default Search
