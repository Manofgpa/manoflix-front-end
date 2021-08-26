import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '../../assets/style'
import SingleMovie from '../../components/SingleMovie/'
import { http, queryMoviesEndpoint, apiKeyEndpoint } from '../../config/http'


const MoviesContainer = () => {

    const [moviesData, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [submit, setSubmit] = useState('')
    const [singleMovie, setSingleMovie] = useState('')
    const [showMovie, setShowMovie] = useState(false)

    const handleClick = () => {
        setSubmit(search)
    }

    const handleSingleMovieClick = (e) => {
        const movieId = e.target.value

        http
            .get(movieId + apiKeyEndpoint)
            .then(res => {
                console.log(res)
                setShowMovie(!showMovie)
            })
    }

    useEffect(() => {
        console.log(showMovie);
    }, [showMovie])

    useEffect(() => {
        if (submit) {
            http
                .get(queryMoviesEndpoint + submit)
                .then(res => {
                    setMovies(res.data.results)

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [submit])

    const MoviesList = () => {
        return (
            <MovieList>
                {
                    moviesData.map(movie => {
                        return (
                            <MovieContainer movie={movie} key={movie.id} />
                        )
                    })
                }
            </MovieList>
        )
    }

    const MovieContainer = ({ movie: { original_title, overview, poster_path, vote_average, id } }) => {
        return (
            <Movie className='Movie'>
                <Image src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={original_title} />
                <H4>{original_title}</H4>
                <p>★{vote_average}</p>
                <h6>{overview}</h6>
                <AddToListButton type="button" value={id} onClick={(e) => handleSingleMovieClick(e)}>Learn more</AddToListButton>
            </Movie>
        )
    }

    return (
        <Container>
            < Search >
                <input className="form-control" onChange={e => setSearch(e.target.value)} type="text" name="movie" value={search} placeholder='Search for a movie' />
                <SearchButton type="button" onClick={handleClick} value="Search" name="search" />
            </Search >
            {showMovie ? (
                <SingleMovie />
            ) : (
                <MoviesList />
            )}
        </Container >
    )
}

export default MoviesContainer

const Search = styled.div`
    margin-top: 2em !important;
    text-align: center;
    margin: 0 auto;
    width: 40%;
    display: flex;
    color: white;
`

const SearchButton = styled.input`
    font-size: 20px;
    margin: 0 5px;
`

const AddToListButton = styled.button`
    width: 100%;
    height: 30px;
`

const MovieList = styled.div`
    max-width: 1280px;
    margin: 5rem auto;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
`

const Movie = styled.div`
    color: white;
    background-color: #0B2027;
    padding: 1rem 2rem;
    border-radius: 1rem;
    -webkit-box-shadow: 8px 5px 24px 0px #7F7F7F;
    box-shadow: 5px 2px 12px 0px #7F7F7F;
    display: grid;
`

const H4 = styled.h4`
    font-weight: bold;
    margin-top: 0.5rem;
`

const Image = styled.img`
    border: 1px dotted white;
    margin: 0.25rem;
    width: 100%;
`