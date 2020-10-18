import React, { useState, useEffect } from 'react';
import Menu from './components/Menu'
import Content from './components/Content'
import Footer from './components/Footer'
import Search from './components/Search'

import './App.css'

const CATEGORIES = "https://api.chucknorris.io/jokes/categories";
const RANDOM_JOKE = "https://api.chucknorris.io/jokes/random";
const RANDOM_JOKE_BY_CATEGORY = "https://api.chucknorris.io/jokes/random?category=";
const RANDOM_JOKE_BY_SEARCH = "https://api.chucknorris.io/jokes/search?query=";

function App() {
  const [categories, setCategories] = useState(['random']);
  const [joke, setJoke] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [section, setSection] = useState('random');
  const [error, setError] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setLoaded(false);
    async function getDatas() {
      await get(CATEGORIES).then(async (data) => {
        setCategories(array => [...array, ...data]);
      })
      await get(RANDOM_JOKE).then(data => setJoke(data));
      setLoaded(true)
    }
    getDatas()
  }, [])

  /*===================================
                REQUESTS
  ====================================*/
  const get = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const getRandomJoke = () => {
    setError(false)
    get(RANDOM_JOKE).then(data => setJoke(data))
  }

  const getRandomJokeByCategory = (name) => {
    setError(false)
    const url = `${RANDOM_JOKE_BY_CATEGORY}${name}`
    get(url).then(data => setJoke(data))
  }

  const getRandomJokeBySearch = (query) => {
    setError(false)
    if (query === "") {
      getJoke(section)
    } else {
      const url = `${RANDOM_JOKE_BY_SEARCH}${query}`
      get(url).then(data => {
        if (data && data.result.length) {
          const random = Math.floor(Math.random() * (data.total + 1));
          setJoke(data.result[random])
        } else {
          setError(true)
        }
      }).catch(err => {
        setError(true)
        console.log(err);
      })
    }
  }

  const getJoke = (name) => {
    if (name !== "random") {
      getRandomJokeByCategory(name);
    } else {
      getRandomJoke();
    }
  }
  /*=================================*/

  const selectSection = (name) => {
    setInput("");
    const search = name || section;
    if (name) setSection(name);
    getJoke(search)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getRandomJokeBySearch(input);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === "")
        getRandomJokeBySearch('')
  }

  if (!isLoaded) {
    return (
      <h2 className="loading">Loading...</h2>
    )
  }

  return (
    <main>
      <Menu categories={categories} selectSection={selectSection} />
      <hr />
      <section>
        <Search input={input} handleSubmit={handleSubmit} handleChange={handleChange} />

        {/* Result is OK */}
        {!error &&
          <>
            <Content joke={joke.value} section={section} />
            <Footer selectSection={selectSection} joke={joke.value} />
          </>
        }

        {/* Result not found */}
        { error &&
          <div>
            <h1 className="title">Chuck Norris Jokes</h1>
            <h2>Sorry result not found</h2>
          </div>
        }
      </section>
    </main>
  );
}

export default App;
