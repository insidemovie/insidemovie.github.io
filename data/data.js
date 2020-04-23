function DataLayer() {
    this.popularMovies = {};
    this.topRatedMovies = {};
    this.upcomingMovies = {};
    this.nowPlayingMovies = {};

    this.popularTvShows = {};
    this.topRatedTvShows = {};
    this.airingTodayShows = {};

    this.nowPlayingMoviesPage = {};
    this.popularMoviesPage = {};
    this.topRatedMoviesPage = {};
    this.upcomingMoviesPage = {};

    this.similarMovies = {};
    this.similarShows = {};

    this.genreMovies = {};
    this.genreShows = {};

    this.movieDetails = {};
    this.showDetails = {};
    this.persistance = new MovieApi();

    this.populatePopularMovies = async () => {
        this.popularMovies = await this.persistance.getPopularMovies();
    };

    this.getPopularMovies = () => {
        return this.popularMovies;
    };

    this.populateTopRatedMovies = async () => {
        this.topRatedMovies = await this.persistance.getTopRatedMovies();
    };

    this.getTopRatedMovies = () => {
        return this.topRatedMovies;
    };

    this.populateUpcomingMovies = async () => {
        this.upcomingMovies = await this.persistance.getUpcomingMovies();
    };

    this.getUpcomingMovies = () => {
        return this.upcomingMovies;
    };

    this.populatePopularTvShows = async (pageNum) => {
        this.popularTvShows = await this.persistance.getPopularTvShows(pageNum);
    };

    this.getPopularTvShows = () => {
        return this.popularTvShows;
    };

    this.populateTopRatedTvShows = async (pageNum) => {
        this.topRatedTvShows = await this.persistance.getTopRatedShows(pageNum);
    };

    this.getTopRatedTvShows = () => {
        return this.topRatedTvShows;
    };

    this.populateNowPlayingMovies = async () => {
        this.nowPlayingMovies = await this.persistance.getNowPlayingMovies();
    };

    this.getNowPlayingMovies = () => {
        return this.nowPlayingMovies;
    };

    this.populateNowPlayingMoviesPage = async (pageNum) => {
        this.nowPlayingMoviesPage = await this.persistance.getNowPlayingMoviesPage(pageNum);
    };

    this.getNowPlayingMoviesPage = () => {
        return this.nowPlayingMoviesPage;
    };

    this.populatePopularMoviesPage = async (pageNum) => {
        this.popularMoviesPage = await this.persistance.getPopularMoviesPage(pageNum);
    };

    this.getPopularMoviesPage = () => {
        return this.popularMoviesPage;
    };

    this.populateTopRatedMoviesPage = async (pageNum) => {
        this.topRatedMoviesPage = await this.persistance.getTopRatedMoviesPage(pageNum);
    };

    this.getTopRatedMoviesPage = () => {
        return this.topRatedMoviesPage;
    };

    this.populateMovieDetails = async (idNum) => {
        this.movieDetails = await this.persistance.getMovieDetails(idNum);
    };

    this.getMovieDetails = () => {
        return this.movieDetails;
    };

    this.populateAiringTodayShows = async (pageNum) => {
        this.airingTodayShows = await this.persistance.getShowsAiringToday(pageNum);
    };

    this.getAiringTodayShows = () => {
        return this.airingTodayShows;
    };

    this.populateUpcomingMoviesPage = async (pageNum) => {
        this.upcomingMoviesPage = await this.persistance.getUpcomingMoviesPage(pageNum);
    };

    this.getUpcomingMoviesPage = () => {
        return this.upcomingMoviesPage;
    };

    this.populateSimilarMovies = async (searchQuery, pageNum) => {
        this.similarMovies = await this.persistance.getSimilarMovies(searchQuery, pageNum);
    };

    this.getSimilarmovies = () => {
        return this.similarMovies;
    };

    this.populateGenreMovies = async (pageNum, genreNum) => {
        this.genreMovies = await this.persistance.getMoviesByGenre(pageNum, genreNum);
    };

    this.getMoviesByGenre = () => {
        return this.genreMovies;
    };

    this.populateGenreShows = async (pageNum, genreNum) => {
        this.genreShows = await this.persistance.getShowsByGenre(pageNum, genreNum);
    };

    this.getShowsByGenre = () => {
        return this.genreShows;
    };

    this.populateShowDetails = async (idNum) => {
        this.showDetails = await this.persistance.getShowDetails(idNum);
    };

    this.getShowDetails = () => {
        return this.showDetails;
    };

    this.populateSimilarShows = async (searchQuery, pageNum) => {
        this.similarShows = await this.persistance.getSimilarShows(searchQuery, pageNum);
    };

    this.getSimilarShows = () => {
        return this.similarShows;
    };
};

