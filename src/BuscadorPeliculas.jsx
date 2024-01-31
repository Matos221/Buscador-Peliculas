import { React, useState } from 'react'

export const BuscadorPeliculas = () => {

        const urlBase = 'https://api.themoviedb.org/3/search/movie'
        const API_KEY = '56e654fdae4b454fa157804a6cc60275'

        const [search, setSearch] = useState('')

        const [peliculas, setPeliculas] = useState([])


        const fetchPeliculas = async () => {

                try {
                        //query=Jack+Reacher&api_key=56e654fdae4b454fa157804a6cc60275
                        const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}`)
                        const data = await response.json()
                        console.log(data.results)
                        setPeliculas(data.results)
                }

                catch (error) {
                        console.log("Ha ocurrido un error: ", error)
                }

        }

        const handleInputChange = (e) => {
                setSearch(e.target.value)
        }
        const handleSubmit = (e) => {
                e.preventDefault()
                fetchPeliculas()
        }

        return (
                <div className="container">
                        <h1 className='title'>Buscador de Peliculas</h1>
                        <form onSubmit={handleSubmit}>

                                <input type="text"
                                        placeholder='Ingrese una pelicula'
                                        value={search}
                                        onChange={handleInputChange}
                                />

                                <button type='submit' className='search-button'> Buscar </button>

                        </form>

                        <div className='movie-list'>
                                {peliculas.map((pelicula) => (
                                        <div key={pelicula.id} className="movie-card">
                                                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                                                <h2>{pelicula.title}</h2>
                                                <p>{pelicula.overview}</p>
                                        </div>
                                ))}

                        </div>

                </div>
        )
}
