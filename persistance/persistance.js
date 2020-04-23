function MovieApi() {
    this.getPopularMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/popular?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };


    this.getTopRatedMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/top_rated?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getUpcomingMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/upcoming?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getPopularTvShows = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/tv/popular?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getTopRatedShows = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/tv/top_rated?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getNowPlayingMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/now_playing?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getNowPlayingMoviesPage = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/now_playing?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                    // console.log(pageNum + 'dynamicUrl');
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getPopularMoviesPage = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/popular?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                    // console.log(pageNum + 'dynamicUrl');
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getTopRatedMoviesPage = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/top_rated?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                    // console.log(pageNum + 'dynamicUrl');
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getMovieDetails = (idNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/" + idNum + "?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US",
                type: "GET",
                success: function (data) {
                    resolve(data);
                    // console.log(idNum + 'dynamicUrl');
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getShowsAiringToday = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/tv/airing_today?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getUpcomingMoviesPage = (pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/movie/upcoming?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getSimilarMovies = (searchQuery, pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/search/movie?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&query=" + searchQuery + "&page=" + pageNum + "&include_adult=false",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                // error: function (error) {
                //     reject(error);
                // }
            });
        });
    };

    this.getMoviesByGenre = (pageNum, genreNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/discover/movie?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNum + "&with_genres=" + genreNum,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getShowsByGenre = (pageNum, genreNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/discover/tv?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&sort_by=popularity.desc&page=" + pageNum + "&timezone=America%2FNew_York&with_genres=" + genreNum + "&include_null_first_air_dates=false",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getShowDetails = (idNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://api.themoviedb.org/3/tv/" + idNum + "?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US",
                type: "GET",
                success: function (data) {
                    resolve(data);
                    // console.log(idNum + 'dynamicUrl');
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };

    this.getSimilarShows = (searchQuery, pageNum) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                "https://api.themoviedb.org/3/search/tv?api_key=577b1e8e26bdb466cb936d37fe55a120&language=en-US&page=" + pageNum + "&query=" + searchQuery + "&include_adult=false",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                // error: function (error) {
                //     reject(error);
                // }
            });
        });
    };
};