import React, { Component } from 'react';

import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';

class Movies extends Component {
    state = {
        movies: getMovies()


    }



    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });

    }
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });  
        
    }
    render() {

        const { length: count } = this.state.movies;



        if (count === 0)
            return <h2 className="mt-4">There are no movies in the database</h2>;

        return (
            <React.Fragment>

                <h2 className="mt-4">Showing {count} movies in the database</h2>
                <table className="table mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th >
                            <th>Genre</th >
                            <th>Stock</th >
                            <th>Rate</th >
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">delete</button></td>
                            </tr>))}
                    </tbody>
                </table>
            </React.Fragment>);

    }
}
export default Movies;