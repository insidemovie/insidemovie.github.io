function BusinessLayer() {
    this.dataLayer = new DataLayer();

    this.getResolvedPopularMovies = async () => {
        await this.dataLayer.populatePopularMovies();
        var popularMovies = this.dataLayer.getPopularMovies();
        // console.log(popularMovies);
        var resolvedPopularMovies = [];

        var movies = popularMovies.results;
        for (let i = 0; i < movies.length; i++) {
            var temp = {
                name: movies[i].title,
                poster: movies[i].poster_path,
                backdrop_poster: movies[i].backdrop_path,
                rating: movies[i].vote_average,
                movie_id: movies[i].id
            };
            resolvedPopularMovies.push(temp);
        };
        // console.log(resolvedPopularMovies);
        return resolvedPopularMovies;
    };

    this.getResolvedTopRatedMovies = async () => {
        await this.dataLayer.populateTopRatedMovies();
        var topRatedMovies = this.dataLayer.getTopRatedMovies();
        // console.log(topRatedMovies);
        var resolvedTopRatedMovies = [];

        var movies = topRatedMovies.results;
        for (let i = 0; i < movies.length; i++) {
            var temp = {
                name: movies[i].title,
                poster: movies[i].poster_path,
                backdrop_poster: movies[i].backdrop_path,
                rating: movies[i].vote_average,
                movie_id: movies[i].id
            };
            resolvedTopRatedMovies.push(temp);
        };
        // console.log(resolvedTopRatedMovies);
        // Probaj i bez return da ja vratis funkcijava za da vidis za stranite menuvanje sto moze da se napravi i za ostanatite detali
        return resolvedTopRatedMovies;
    };

    this.getResolvedUpcomingMovies = async () => {
        await this.dataLayer.populateUpcomingMovies();
        var upcomingMovies = this.dataLayer.getUpcomingMovies();
        // console.log(upcomingMovies);
        var resolvedUpcomingMovies = [];

        var movies = upcomingMovies.results;
        for (let i = 0; i < movies.length; i++) {
            var temp = {
                name: movies[i].title,
                poster: movies[i].poster_path,
                backdrop_poster: movies[i].backdrop_path,
                rating: movies[i].vote_average,
                movie_id: movies[i].id
            };
            resolvedUpcomingMovies.push(temp);

        };
        // console.log(resolvedUpcomingMovies);
        // console.log(upcomingMovies)
        return resolvedUpcomingMovies;
    };

    this.getResolvedPopularTvShows = async (pageNum) => {
        await this.dataLayer.populatePopularTvShows(pageNum);
        var popularTvShows = this.dataLayer.getPopularTvShows();
        var resolvedPopularTvShows = [];
        var popularShows = popularTvShows.results;
        for (let i = 0; i < popularShows.length; i++) {
            var shortInfo = {
                name: popularShows[i].name,
                poster: popularShows[i].poster_path,
                backdrop_poster: popularShows[i].backdrop_path,
                rating: popularShows[i].vote_average,
                show_id: popularShows[i].id,
                all_pages: popularTvShows.total_pages
            };
            resolvedPopularTvShows.push(shortInfo);
        };
        // console.log(resolvedPopularTvShows);
        return resolvedPopularTvShows;
    };

    this.getResolvedTopRatedTvShows = async (pageNum) => {
        await this.dataLayer.populateTopRatedTvShows(pageNum);
        var topRatedTvShows = this.dataLayer.getTopRatedTvShows();
        var resolvedTopRatedTvShows = [];
        var topRatedShows = topRatedTvShows.results;
        for (let i = 0; i < topRatedShows.length; i++) {
            var topRatedShortInfo = {
                name: topRatedShows[i].name,
                poster: topRatedShows[i].poster_path,
                backdrop_poster: topRatedShows[i].backdrop_path,
                rating: topRatedShows[i].vote_average,
                show_id: topRatedShows[i].id,
                all_pages: topRatedTvShows.total_pages
            };
            resolvedTopRatedTvShows.push(topRatedShortInfo);
        };
        // console.log(resolvedTopRatedTvShows);
        return resolvedTopRatedTvShows;
    };

    this.getResolvedNowPlayingMovies = async () => {
        await this.dataLayer.populateNowPlayingMovies();
        var nowPlayingMovies = this.dataLayer.getNowPlayingMovies();
        var resolvedNowPlayingMovies = [];
        var nowPlaying = nowPlayingMovies.results;
        for (let i = 0; i < nowPlaying.length; i++) {
            var nowPlayingShortInfo = {
                name: nowPlaying[i].title,
                poster: nowPlaying[i].poster_path,
                backdrop_poster: nowPlaying[i].backdrop_path,
                rating: nowPlaying[i].vote_average,
                movie_id: nowPlaying[i].id
            };
            resolvedNowPlayingMovies.push(nowPlayingShortInfo);

        };
        // console.log(resolvedNowPlayingMovies);
        return resolvedNowPlayingMovies;
    };

    this.getResolvedNowPlayingMoviesPage = async (pageNum) => {
        await this.dataLayer.populateNowPlayingMoviesPage(pageNum);
        var nowPlayingMovies = this.dataLayer.getNowPlayingMoviesPage();
        var resolvedNowPlayingMovies = [];
        var nowPlaying = nowPlayingMovies.results;
        for (let i = 0; i < nowPlaying.length; i++) {
            var temp = {
                name: nowPlaying[i].title,
                poster: nowPlaying[i].poster_path,
                backdrop_poster: nowPlaying[i].backdrop_path,
                rating: nowPlaying[i].vote_average,
                movie_id: nowPlaying[i].id
            }
            resolvedNowPlayingMovies.push(temp)
        }
        // console.log(nowPlayingMovies.total_pages);
        return nowPlayingMovies;
    };

    this.getResolvedPopularMoviesPage = async (pageNum) => {
        await this.dataLayer.populatePopularMoviesPage(pageNum);
        var popularMovies = this.dataLayer.getPopularMoviesPage();
        return popularMovies;
    };

    this.getResolvedTopRatedMoviesPage = async (pageNum) => {
        await this.dataLayer.populateTopRatedMoviesPage(pageNum);
        var topRatedMovies = this.dataLayer.getTopRatedMoviesPage();
        var resolvedTopRated = [];
        var results = topRatedMovies.results;
        for (let i = 0; i < results.length; i++) {
            var temp = {
                poster: results[i].poster_path,
                movie_id: results[i].id,
                backdrop: results[i].backdrop_path,
                name: results[i].title,
                rating: results[i].vote_average,
                all_pages: topRatedMovies.total_pages
            }
            resolvedTopRated.push(temp);
        }
        // console.log(resolvedTopRated)
        return resolvedTopRated;
    };

    this.getResolvedMovieDetails = async (idNum) => {
        // var idNum = 338762;
        await this.dataLayer.populateMovieDetails(idNum);
        var movieDetails = this.dataLayer.getMovieDetails();
        var genres = movieDetails.genres;
        var prodCompanies = movieDetails.production_companies;
        var resolvedDetails = [];
        var temp = {
            backdrop_poster: movieDetails.backdrop_path,
            budget: movieDetails.budget,
            homepage: movieDetails.homepage,
            original_title: movieDetails.original_title,
            overview: movieDetails.overview,
            poster: movieDetails.poster_path,
            release_date: movieDetails.release_date,
            duration: movieDetails.runtime,
            name: movieDetails.title,
            duration: movieDetails.runtime,
            rating: movieDetails.vote_average
        }
        resolvedDetails.push(temp);
        for (let i = 0; i < genres.length; i++) {
            var genreNames = {
                genre_name: genres[i].name
            }
            resolvedDetails.push(genreNames)
        }


        // console.log(resolvedDetails)
        return resolvedDetails;
    };

    this.getResolvedAiringTodayShows = async (pageNum) => {
        await this.dataLayer.populateAiringTodayShows(pageNum);
        var airingToday = this.dataLayer.getAiringTodayShows();
        var results = airingToday.results;

        var resolvedAiringToday = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                name: results[i].name,
                backdrop: results[i].backdrop_path,
                show_id: results[i].id,
                rating: results[i].vote_average,
                poster: results[i].poster_path,
                all_pages: airingToday.total_pages
            }
            resolvedAiringToday.push(temp);
        }
        // console.log(resolvedAiringToday)
        return resolvedAiringToday;
    };

    this.getResolvedUpcomingMoviesPage = async (pageNum) => {
        await this.dataLayer.populateUpcomingMoviesPage(pageNum);
        var upcomingMovies = this.dataLayer.getUpcomingMoviesPage();
        var results = upcomingMovies.results;
        var resolvedUpcomingMovies = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                poster: results[i].poster_path,
                movie_id: results[i].id,
                backdrop: results[i].backdrop_path,
                name: results[i].title,
                rating: results[i].vote_average,
                all_pages: upcomingMovies.total_pages
            }
            resolvedUpcomingMovies.push(temp);
        }
        // console.log(resolvedUpcomingMovies)
        return resolvedUpcomingMovies;
    };

    this.getResolvedSimilarmovies = async (searchQuery, pageNum) => {
        await this.dataLayer.populateSimilarMovies(searchQuery, pageNum);
        var similarMovies = this.dataLayer.getSimilarmovies();
        var results = similarMovies.results;
        var resolvedSimilarMovies = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                poster: results[i].poster_path,
                movie_id: results[i].id,
                backdrop: results[i].backdrop_path,
                name: results[i].title,
                rating: results[i].vote_average,
                all_pages: similarMovies.total_pages
            }
            resolvedSimilarMovies.push(temp);
        }
        // console.log(resolvedSimilarMovies);
        return resolvedSimilarMovies;
    };

    this.getResolvedGenreMovies = async (pageNum, genreNum) => {
        await this.dataLayer.populateGenreMovies(pageNum, genreNum);
        var genreMovies = this.dataLayer.getMoviesByGenre();
        var results = genreMovies.results;
        var resolvedGenreMovies = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                poster: results[i].poster_path,
                movie_id: results[i].id,
                backdrop: results[i].backdrop_path,
                name: results[i].title,
                rating: results[i].vote_average,
                all_pages: genreMovies.total_pages
            }
            resolvedGenreMovies.push(temp);
        }
        // console.log(resolvedGenreMovies)
        return resolvedGenreMovies;
    };

    this.getResolvedGenreShows = async (pageNum, genreNum) => {
        await this.dataLayer.populateGenreShows(pageNum, genreNum);
        var genreShows = this.dataLayer.getShowsByGenre();
        var results = genreShows.results;
        var resolvedGenreShows = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                name: results[i].name,
                backdrop: results[i].backdrop_path,
                show_id: results[i].id,
                rating: results[i].vote_average,
                poster: results[i].poster_path,
                all_pages: genreShows.total_pages
            }
            resolvedGenreShows.push(temp);
        }
        // console.log(resolvedGenreShows);
        return resolvedGenreShows;
    };

    this.getResolvedShowDetails = async (idNum) => {
        // var idNum = 71446;
        await this.dataLayer.populateShowDetails(idNum);
        var showDetails = this.dataLayer.getShowDetails();
        var resolvedShowDetails = [];
        var temp = {
            backdrop: showDetails.backdrop_path,
            first_air_date: showDetails.first_air_date,
            homepage: showDetails.homepage,
            last_air_date: showDetails.last_air_date,
            name: showDetails.name,
            episodeNum: showDetails.number_of_episodes,
            seasonNum: showDetails.number_of_seasons,
            original_name: showDetails.original_name,
            overview: showDetails.overview,
            poster: showDetails.poster_path,
            rating: showDetails.vote_average,
        }
        resolvedShowDetails.push(temp);
        for (let i = 0; i < showDetails.genres.length; i++) {
            var genreNames = {
                genre_name: showDetails.genres[i].name
            }
            resolvedShowDetails.push(genreNames)
        }

        // console.log(resolvedShowDetails)
        return resolvedShowDetails;
    };

    this.getResolvedSimilarShows = async (searchQuery, pageNum) => {
        await this.dataLayer.populateSimilarShows(searchQuery, pageNum);
        var similarShows = this.dataLayer.getSimilarShows();
        var results = similarShows.results;
        var resolvedSimilarShows = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                poster: results[i].poster_path,
                show_id: results[i].id,
                backdrop: results[i].backdrop_path,
                name: results[i].name,
                rating: results[i].vote_average,
                all_pages: similarShows.total_pages
            }
            resolvedSimilarShows.push(temp);
        }
        // console.log(similarShows);
        return resolvedSimilarShows;
    };
};