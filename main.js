function main() {
    var persistanceLayer = new MovieApi();
    // persistanceLayer.getMovieDetails();

    var businessLayer = new BusinessLayer();
    businessLayer.getResolvedPopularMovies();
    businessLayer.getResolvedTopRatedMovies();
    businessLayer.getResolvedUpcomingMovies();
    businessLayer.getResolvedPopularTvShows();
    businessLayer.getResolvedTopRatedTvShows();
    businessLayer.getResolvedNowPlayingMovies();
    businessLayer.getResolvedNowPlayingMoviesPage();
    businessLayer.getResolvedMovieDetails();
    businessLayer.getResolvedSimilarmovies();

    businessLayer.getResolvedTopRatedMoviesPage();
    businessLayer.getResolvedAiringTodayShows();
    businessLayer.getResolvedUpcomingMoviesPage();
    businessLayer.getResolvedGenreMovies();
    businessLayer.getResolvedGenreShows();
    businessLayer.getResolvedShowDetails();
    businessLayer.getResolvedSimilarShows();

    var presentationLayer = new PresentationLayer();
    presentationLayer.displaySearchBar();
    // presentationLayer.menuOnHover();
    presentationLayer.displayIntro();
    presentationLayer.displayPosterImages();
    presentationLayer.displayTopRatedPosters();
    presentationLayer.displayUpcomingPosters();
    presentationLayer.displayNowPlayingPage();
    presentationLayer.displayMovieDetails();
    presentationLayer.displayPopularMoviesPage();
    presentationLayer.displayTopRatedPage();
    presentationLayer.displayUpcomingPage();
    presentationLayer.displayPopularShowsScroll();
    presentationLayer.displayTopRatedShowsScroll();
    presentationLayer.displayPopularShowsPage();
    presentationLayer.displayAiringTodayShowsPage();
    presentationLayer.displayTopRatedShowsPage();
    // presentationLayer.display();

    presentationLayer.displayShowsIntro();
    presentationLayer.displaySearchSimilarMovies();
    presentationLayer.displayMoviesByGenre();
    presentationLayer.displayShowsByGenre();

    presentationLayer.displayShowsDetails();

    presentationLayer.displaySearchSimilarShows();

    presentationLayer.displayMainMenu();

    presentationLayer.displayPopularMoviesBox4();
    presentationLayer.displayPopularMoviesBox3();
    presentationLayer.displayPopularMoviesBox2();
    presentationLayer.displayTopRatedMoviesBox4();
    presentationLayer.displayTopRatedMoviesBox3();
    presentationLayer.displayTopRatedMoviesBox2();
    presentationLayer.displayUpcomingMoviesBox4();
    presentationLayer.displayUpcomingMoviesBox3();
    presentationLayer.displayUpcomingMoviesBox2();
    presentationLayer.displayPopularShowsBox4();
    presentationLayer.displayPopularShowsBox3();
    presentationLayer.displayPopularShowsBox2();
    presentationLayer.displayTopRatedShowsBox4();
     presentationLayer.displayTopRatedShowsBox3();
     presentationLayer.displayTopRatedShowsBox2();

     presentationLayer.displayMobileMainMenu();

     presentationLayer.displaySearchSimilarMoviesMainPage();

};

main();