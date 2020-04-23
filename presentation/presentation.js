function PresentationLayer() {
    this.business = new BusinessLayer();

    this.displaySearchBar = () => {
        $(".fa.fa-search").on("click", async event => {
            $(".search_input_style").toggle("slow", function () {
            });
            $(".fa.fa-search").css("display", "none");
            $(".close_search_bar").css("font-size", "20px").css("display", "block");
        });

        $(".close_search_bar").on("click", async event => {
            $(".search_input_style").val('');
            $(".search_name_suggest").html('');
            $(".search_show_name_suggest").html('');
            $(".search_input_style").toggle("slow", function () {
            });
            $(".close_search_bar").css("font-size", "0px").css("display", "none");
            $(".fa.fa-search").css("display", "block");
        });
    };

    this.displayMainMenu = () => {
        $(".list_menu").on("click", async event => {
            // $("main_menu_modal").css("display", "flex");
            $(".main_menu_modal").toggle("slow", function () {

            });
        });

        $(".close_menu_icon").on("click", async event=>{
            $(".main_menu_modal").toggle("slow", function () {
            });
        });
    };

    this.displayMobileMainMenu = () => {
        $(".fa.fa-bars").on("click", async event => {
            // $("main_menu_modal").css("display", "flex");
            $(".main_menu_modal").toggle("slow", function () {

            });
        });

        // $(".close_menu_icon").on("click", async event=>{
        //     $(".main_menu_modal").toggle("slow", function () {
        //     });
        // });
    };

    this.displaySearchSimilarMovies = async (searchQuery, pageNum) => {
        var body = $("body");
        var popup = $(".search_movie_modal");
        var mainContainer = $(".search_movie_modal_main_container");
        var inputForm = $(".main_search_form");
        var inputField = $(".search_input");
        var close = $(".close_search_modal i.bx-x-circle");
        var pageNum;
        var searchQuery;
        var similarMovies;
        var output = '';
        var totalPages;
        var next;
        var nameDiv = $(".search_name_suggest");
        // console.log(total)

        inputField.on("keyup", async event => {
            pageNum = 1;
            searchQuery = $(event.target).val();
            var output2 = '';
            if (searchQuery.length > 2) {
                similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
                for (let i = 0; i < 5; i++) {
                    output2 += `
                    <p class="search_name">${similarMovies[i].name}</p>
                    `;
                    // console.log(similarMovies[i]);
                    nameDiv.html(output2);
                }
            }
            else {
                nameDiv.html('');
            }

            $(".search_name").on("click", async event=>{
                event.preventDefault();
                var textVal=$(event.target).text();
               inputField.val(textVal);
               mainContainer.html('');
               pageNum = 1;
               searchQuery = textVal;
               similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
               totalPages = similarMovies[0].all_pages;
               output = '';
               $.each(similarMovies, (index, movie) => {
                   output += `
                   <div class="movie_poster_box movie_box_style">
                       <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                       </div>
                         <div class="info_holder">
                             <div class="rate_box_holder">
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <p class="rate_style">${movie.rating}</p>
                             </div>
                               <p class="name_style">${movie.name}</p>
                                   <div class="more_info_button_style more_info_search_movies_button" id="${movie.movie_id}">
                                       <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                       <p class="more_info" id="${movie.movie_id}">More Info</p>
                                   </div>
                         </div>
                   </div>
                   `
               });
               mainContainer.html(output);
               popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
               body.css("overflow", "hidden");
               $(".more_info_search_movies_button").on("click", async event => {
                   var movieId = $(event.target).attr('id');
                   var backPage = "../index.html";
                   sessionStorage.setItem('backPage', backPage);
                   sessionStorage.setItem('movieId', movieId);
                   window.location = "../details/movie_details.html";
               });
        });
        });

        inputForm.on("submit", async event => {
            event.preventDefault();
            mainContainer.html('');
            pageNum = 1;
            searchQuery = inputField.val();
            similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
            totalPages = similarMovies[0].all_pages;
            output = '';
            $.each(similarMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_search_movies_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
            body.css("overflow", "hidden");
            $(".more_info_search_movies_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../index.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
            // console.log(similarMovies)
        });

        popup.on("scroll", async event => {
            event.preventDefault();
            if (popup.scrollTop() + popup.innerHeight() >= popup[0].scrollHeight) {
                next = pageNum + 1;
                if (next < totalPages) {
                    pageNum = next;
                }
                else {
                    return false;
                }
                similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
                output = '';

                $.each(similarMovies, (index, movie) => {
                    output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_search_movies_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
                });
                mainContainer.append(output);
                console.log(next)
            }
            $(".more_info_search_movies_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../index.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        close.on("click", async event => {
            popup.css("height", "0vh").css("display", "none").css("transition", "0.4s");
            body.css("overflow", "auto");
        });
        // console.log(similarMovies);
    };


    this.displaySearchSimilarMoviesMainPage = async (searchQuery, pageNum) => {
        var body = $("body");
        var popup = $(".search_movie_modal_index");
        var mainContainer = $(".search_movie_modal_main_container_index");
        var inputForm = $(".main_search_form_index");
        var inputField = $(".search_input_index");
        var close = $(".close_search_modal i.bx-x-circle");
        var pageNum;
        var searchQuery;
        var similarMovies;
        var output = '';
        var totalPages;
        var next;
        var nameDiv = $(".search_name_suggest");
        // console.log(total)

        inputField.on("keyup", async event => {
            pageNum = 1;
            searchQuery = $(event.target).val();
            var output2 = '';
            if (searchQuery.length > 2) {
                similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
                for (let i = 0; i < 5; i++) {
                    output2 += `
                    <p class="search_name_index">${similarMovies[i].name}</p>
                    `;
                    // console.log(similarMovies[i]);
                    nameDiv.html(output2);
                }
            }
            else {
                nameDiv.html('');
            }

            $(".search_name_index").on("click", async event=>{
                event.preventDefault();
                var textVal=$(event.target).text();
               inputField.val(textVal);
               mainContainer.html('');
               pageNum = 1;
               searchQuery = textVal;
               similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
               totalPages = similarMovies[0].all_pages;
               output = '';
               $.each(similarMovies, (index, movie) => {
                   output += `
                   <div class="movie_poster_box movie_box_style">
                       <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                       </div>
                         <div class="info_holder">
                             <div class="rate_box_holder">
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>
                               <p class="rate_style">${movie.rating}</p>
                             </div>
                               <p class="name_style">${movie.name}</p>
                                   <div class="more_info_button_style more_info_search_movies_button_index" id="${movie.movie_id}">
                                       <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                       <p class="more_info" id="${movie.movie_id}">More Info</p>
                                   </div>
                         </div>
                   </div>
                   `
               });
               mainContainer.html(output);
               popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
               body.css("overflow", "hidden");
               $(".more_info_search_movies_button_index").on("click", async event => {
                   var movieId = $(event.target).attr('id');
                   var backPage = "../index.html";
                   sessionStorage.setItem('backPage', backPage);
                   sessionStorage.setItem('movieId', movieId);
                   window.location = "details/movie_details.html";
               });
        });
        });

        inputForm.on("submit", async event => {
            event.preventDefault();
            mainContainer.html('');
            pageNum = 1;
            searchQuery = inputField.val();
            similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
            totalPages = similarMovies[0].all_pages;
            output = '';
            $.each(similarMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_search_movies_button_index" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
            body.css("overflow", "hidden");
            $(".more_info_search_movies_button_index").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../index.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "details/movie_details.html";
            });
            // console.log(similarMovies)
        });

        popup.on("scroll", async event => {
            event.preventDefault();
            if (popup.scrollTop() + popup.innerHeight() >= popup[0].scrollHeight) {
                next = pageNum + 1;
                if (next < totalPages) {
                    pageNum = next;
                }
                else {
                    return false;
                }
                similarMovies = await this.business.getResolvedSimilarmovies(searchQuery, pageNum);
                output = '';

                $.each(similarMovies, (index, movie) => {
                    output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_search_movies_button_index" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
                });
                mainContainer.append(output);
                console.log(next)
            }
            $(".more_info_search_movies_button_index").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../index.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "details/movie_details.html";
            });
        });

        close.on("click", async event => {
            popup.css("height", "0vh").css("display", "none").css("transition", "0.4s");
            body.css("overflow", "auto");
        });
        // console.log(similarMovies);
    };

    this.displaySearchSimilarShows = async (searchQuery, pageNum) => {
        var body = $("body");
        var popup = $(".search_show_modal");
        var mainContainer = $(".search_show_modal_main_container");
        var inputForm = $(".main_search_shows_form");
        var inputField = $(".search_shows_input");
        var close = $(".close_search_show_modal i.bx-x-circle");
        var pageNum;
        var searchQuery;
        var similarShows;
        var output = '';
        var totalPages;
        var next;
        var nameDiv = $(".search_show_name_suggest");
        // console.log(total)

        inputField.on("keyup", async event => {
            pageNum = 1;
            searchQuery = $(event.target).val();
            var output2 = '';
            if (searchQuery.length > 2) {
                similarShows = await this.business.getResolvedSimilarShows(searchQuery, pageNum);
                for (let i = 0; i < 5; i++) {
                    output2 += `
                    <p class="search_show_name">${similarShows[i].name}</p>
                    `;
                    // console.log(similarMovies[i]);
                    nameDiv.html(output2);
                }
            }
            else {
                nameDiv.html('');
            }

            $(".search_show_name").on("click", async event=>{
                event.preventDefault();
                var textVal=$(event.target).text();
                inputField.val(textVal);
                mainContainer.html('');
                pageNum = 1;
                searchQuery = textVal;
                similarShows = await this.business.getResolvedSimilarShows(searchQuery, pageNum);
                totalPages = similarShows[0].all_pages;
                output = '';
                $.each(similarShows, (index, show) => {
                    output += `
                    <div class="movie_poster_box movie_box_style">
                        <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${show.poster}')">
                        </div>
                          <div class="info_holder">
                              <div class="rate_box_holder">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <p class="rate_style">${show.rating}</p>
                              </div>
                                <p class="name_style">${show.name}</p>
                                    <div class="more_info_button_style more_info_search_shows_button" id="${show.show_id}">
                                        <i class="fa fa-info-circle" id="${show.show_id}"></i>
                                        <p class="more_info" id="${show.show_id}">More Info</p>
                                    </div>
                          </div>
                    </div>
                    `
                });
                mainContainer.html(output);
                popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
                body.css("overflow", "hidden");
                $(".more_info_search_shows_button").on("click", async event => {
                    var showId = $(event.target).attr('id');
                    var showsBackPage = "../shows/tv_shows.html";
                    sessionStorage.setItem('showsBackPage', showsBackPage);
                    sessionStorage.setItem('showId', showId);
                    window.location = "../details/show_details.html";
                });
            });
        });

        inputForm.on("submit", async event => {
            event.preventDefault();
            mainContainer.html('');
            pageNum = 1;
            searchQuery = inputField.val();
            similarShows = await this.business.getResolvedSimilarShows(searchQuery, pageNum);
            totalPages = similarShows[0].all_pages;
            output = '';
            $.each(similarShows, (index, show) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${show.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${show.rating}</p>
                          </div>
                            <p class="name_style">${show.name}</p>
                                <div class="more_info_button_style more_info_search_shows_button" id="${show.show_id}">
                                    <i class="fa fa-info-circle" id="${show.show_id}"></i>
                                    <p class="more_info" id="${show.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            popup.css("height", "100vh").css("display", "block").css("transition", "0.4s");
            body.css("overflow", "hidden");
            $(".more_info_search_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../shows/tv_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage);
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
            console.log(similarShows)
        });

        popup.on("scroll", async event => {
            event.preventDefault();
            if (popup.scrollTop() + popup.innerHeight() >= popup[0].scrollHeight) {
                next = pageNum + 1;
                if (next < totalPages) {
                    pageNum = next;
                }
                else {
                    return false;
                }
                similarShows = await this.business.getResolvedSimilarShows(searchQuery, pageNum);
                output = '';

                $.each(similarShows, (index, show) => {
                    output += `
                    <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${show.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${show.rating}</p>
                          </div>
                            <p class="name_style">${show.name}</p>
                                <div class="more_info_button_style more_info_search_shows_button" id="${show.show_id}">
                                    <i class="fa fa-info-circle" id="${show.show_id}"></i>
                                    <p class="more_info" id="${show.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
                });
                mainContainer.append(output);
                console.log(next)
            }
            $(".more_info_search_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../shows/tv_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage);
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });

        close.on("click", async event => {
            popup.css("height", "0vh").css("display", "none").css("transition", "0.4s");
            body.css("overflow", "auto");
        });
        // console.log(similarMovies);
    };

    this.displayIntro = async () => {
        var nowPlayingMovies = await this.business.getResolvedNowPlayingMovies();
        var posterPics = [];
        var backdropPics = [];
        var shortInfo = [];
        for (let i = 0; i < nowPlayingMovies.length; i++) {
            var poster = nowPlayingMovies[i].poster;
            var backdropPoster = nowPlayingMovies[i].backdrop_poster;
            var nameObject = {
                movieName: nowPlayingMovies[i].name,
                movieRating: nowPlayingMovies[i].rating
            };
            posterPics.push(poster);
            backdropPics.push(backdropPoster);
            shortInfo.push(nameObject);
        };
        // console.log(shortInfo);
        // console.log(posterPics);
        // console.log(backdropPics);
        // console.log(nowPlayingMovies)

        var val = 0;
        var buttonId = nowPlayingMovies[val].movie_id;
        var dots="...";

        $(".intro_button").attr("id", buttonId);
        $(".intro_circle").attr("id", buttonId);
        $(".intro_info").attr("id", buttonId);
        $(".big_poster_container")
            .css("background-image", "url(" + 'https://image.tmdb.org/t/p/original' + posterPics[val] + ")");

        $(".backdrop_image_container")
            .css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + backdropPics[val] + ")");

        $(".rating_number").text(shortInfo[val].movieRating);
        $(".movie_name").text(shortInfo[val].movieName.substring(0,20));

        $(".next").on("click", async event => {
            $(".big_poster_container").css("opacity", "0");
            $(".backdrop_image_container").css("opacity", "0");
            var next = val + 1;
            if (next < posterPics.length) {
                val = next;
                // return val;
            }
            else {
                val = 0;
            }
            $(".big_poster_container").css("background-image", "url(" + 'https://image.tmdb.org/t/p/original' + posterPics[val] + ")").css("opacity", "").css("transition", "0.4s");
            $(".backdrop_image_container").css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + backdropPics[val] + ")").css("opacity", "").css("transition", "0.4s");
            $(".rating_number").text(shortInfo[val].movieRating);
            $(".movie_name").text(shortInfo[val].movieName.substring(0,20));
            $(".intro_button").attr("id", nowPlayingMovies[val].movie_id);
            $(".intro_circle").attr("id", nowPlayingMovies[val].movie_id);
            $(".intro_info").attr("id", nowPlayingMovies[val].movie_id);
            // console.log(buttonId);
            
        });

        $(".previous").on("click", async event => {
            $(".big_poster_container").css("opacity", "0");
            $(".backdrop_image_container").css("opacity", "0");
            var previous = val - 1;
            if (previous >= 0) {
                val = previous;
            }
            else {
                var lastIndex = posterPics.length - 1;
                val = lastIndex;
            }
            $(".big_poster_container").css("background-image", "url(" + 'https://image.tmdb.org/t/p/original' + posterPics[val] + ")").css("opacity", "").css("transition", "0.4s");
            $(".backdrop_image_container").css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + backdropPics[val] + ")").css("opacity", "").css("transition", "0.4s");
            $(".rating_number").text(shortInfo[val].movieRating);
            var name=$(".movie_name").text(shortInfo[val].movieName.substring(0,20));
            $(".intro_button").attr("id", nowPlayingMovies[val].movie_id);
            $(".intro_circle").attr("id", nowPlayingMovies[val].movie_id);
            $(".intro_info").attr("id", nowPlayingMovies[val].movie_id);
            // console.log(dots)
            // console.log(name.text().length)
            // if (name.text().lenght >= 20) {
            //     name=name.text()+dots;
            // }
        });
    };

    this.displayPosterImages = async () => {
        var popularMovies = await this.business.getResolvedPopularMovies();
        var imgHolder0 = $(".img_container_0");
        var imgHolder1 = $(".img_container_1");
        var imgHolder2 = $(".img_container_2");
        var imgHolder3 = $(".img_container_3");
        var imgHolder4 = $(".img_container_4");

        var rate_0 = $(".rate_0");
        var rate_1 = $(".rate_1");
        var rate_2 = $(".rate_2");
        var rate_3 = $(".rate_3");
        var rate_4 = $(".rate_4");

        var name_0 = $(".name_0");
        var name_1 = $(".name_1");
        var name_2 = $(".name_2");
        var name_3 = $(".name_3");
        var name_4 = $(".name_4");

        var class_1 = $(".pop_button_1");
        var class_2 = $(".pop_button_2");
        var class_3 = $(".pop_button_3");
        var class_4 = $(".pop_button_4");
        var class_5 = $(".pop_button_5");

        var circle_1 = $(".pop_circle_1");
        var circle_2 = $(".pop_circle_2");
        var circle_3 = $(".pop_circle_3");
        var circle_4 = $(".pop_circle_4");
        var circle_5 = $(".pop_circle_5");

        var info_1 = $(".pop_info_1");
        var info_2 = $(".pop_info_2");
        var info_3 = $(".pop_info_3");
        var info_4 = $(".pop_info_4");
        var info_5 = $(".pop_info_5");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
        val_4 = 4;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")");
        imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_4].poster + ")");

        rate_0.text(popularMovies[val_0].rating);
        rate_1.text(popularMovies[val_1].rating);
        rate_2.text(popularMovies[val_2].rating);
        rate_3.text(popularMovies[val_3].rating);
        rate_4.text(popularMovies[val_4].rating);

        name_0.text(popularMovies[val_0].name);
        name_1.text(popularMovies[val_1].name);
        name_2.text(popularMovies[val_2].name);
        name_3.text(popularMovies[val_3].name);
        name_4.text(popularMovies[val_4].name);

        class_1.attr("id", popularMovies[val_0].movie_id);
        class_2.attr("id", popularMovies[val_1].movie_id);
        class_3.attr("id", popularMovies[val_2].movie_id);
        class_4.attr("id", popularMovies[val_3].movie_id);
        class_5.attr("id", popularMovies[val_4].movie_id);

        circle_1.attr("id", popularMovies[val_0].movie_id);
        circle_2.attr("id", popularMovies[val_1].movie_id);
        circle_3.attr("id", popularMovies[val_2].movie_id);
        circle_4.attr("id", popularMovies[val_3].movie_id);
        circle_5.attr("id", popularMovies[val_4].movie_id);

        info_1.attr("id", popularMovies[val_0].movie_id);
        info_2.attr("id", popularMovies[val_1].movie_id);
        info_3.attr("id", popularMovies[val_2].movie_id);
        info_4.attr("id", popularMovies[val_3].movie_id);
        info_5.attr("id", popularMovies[val_4].movie_id);

        $(".next_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var next_1 = val_0 + 5;
            var next_2 = val_1 + 5;
            var next_3 = val_2 + 5;
            var next_4 = val_3 + 5;
            var next_5 = val_4 + 5;

            if (next_5 <= popularMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
                val_4 = next_5;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
                val_4 = 4;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
            rate_3.text(popularMovies[val_3].rating);
            rate_4.text(popularMovies[val_4].rating);

            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
            name_3.text(popularMovies[val_3].name);
            name_4.text(popularMovies[val_4].name);

            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
            class_4.attr("id", popularMovies[val_3].movie_id);
            class_5.attr("id", popularMovies[val_4].movie_id);

            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
            circle_4.attr("id", popularMovies[val_3].movie_id);
            circle_5.attr("id", popularMovies[val_4].movie_id);

            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
            info_4.attr("id", popularMovies[val_3].movie_id);
            info_5.attr("id", popularMovies[val_4].movie_id);

        });

        $(".previous_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var previous_1 = val_0 - 5;
            var previous_2 = val_1 - 5;
            var previous_3 = val_2 - 5;
            var previous_4 = val_3 - 5;
            var previous_5 = val_4 - 5;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
                val_4 = previous_5;
            }
            else {
                val_0 = 15;
                val_1 = 16;
                val_2 = 17;
                val_3 = 18;
                val_4 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
            rate_3.text(popularMovies[val_3].rating);
            rate_4.text(popularMovies[val_4].rating);

            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
            name_3.text(popularMovies[val_3].name);
            name_4.text(popularMovies[val_4].name);

            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
            class_4.attr("id", popularMovies[val_3].movie_id);
            class_5.attr("id", popularMovies[val_4].movie_id);

            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
            circle_4.attr("id", popularMovies[val_3].movie_id);
            circle_5.attr("id", popularMovies[val_4].movie_id);

            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
            info_4.attr("id", popularMovies[val_3].movie_id);
            info_5.attr("id", popularMovies[val_4].movie_id);

        });

        // console.log(popularMovies);
    };


    this.displayTopRatedPosters = async () => {
        var topRatedMovies = await this.business.getResolvedTopRatedMovies();
        var imgHolder0 = $(".top_img_container_0");
        var imgHolder1 = $(".top_img_container_1");
        var imgHolder2 = $(".top_img_container_2");
        var imgHolder3 = $(".top_img_container_3");
        var imgHolder4 = $(".top_img_container_4");

        var rate_0 = $(".top_rate_0");
        var rate_1 = $(".top_rate_1");
        var rate_2 = $(".top_rate_2");
        var rate_3 = $(".top_rate_3");
        var rate_4 = $(".top_rate_4");

        var name_0 = $(".top_name_0");
        var name_1 = $(".top_name_1");
        var name_2 = $(".top_name_2");
        var name_3 = $(".top_name_3");
        var name_4 = $(".top_name_4");

        var class_1 = $(".top_button_1");
        var class_2 = $(".top_button_2");
        var class_3 = $(".top_button_3");
        var class_4 = $(".top_button_4");
        var class_5 = $(".top_button_5");

        var circle_1 = $(".top_circle_1");
        var circle_2 = $(".top_circle_2");
        var circle_3 = $(".top_circle_3");
        var circle_4 = $(".top_circle_4");
        var circle_5 = $(".top_circle_5");

        var info_1 = $(".top_info_1");
        var info_2 = $(".top_info_2");
        var info_3 = $(".top_info_3");
        var info_4 = $(".top_info_4");
        var info_5 = $(".top_info_5");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
        val_4 = 4;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")");
        imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_4].poster + ")");

        rate_0.text(topRatedMovies[val_0].rating);
        rate_1.text(topRatedMovies[val_1].rating);
        rate_2.text(topRatedMovies[val_2].rating);
        rate_3.text(topRatedMovies[val_3].rating);
        rate_4.text(topRatedMovies[val_4].rating);

        name_0.text(topRatedMovies[val_0].name);
        name_1.text(topRatedMovies[val_1].name);
        name_2.text(topRatedMovies[val_2].name);
        name_3.text(topRatedMovies[val_3].name);
        name_4.text(topRatedMovies[val_4].name);

        class_1.attr("id", topRatedMovies[val_0].movie_id);
        class_2.attr("id", topRatedMovies[val_1].movie_id);
        class_3.attr("id", topRatedMovies[val_2].movie_id);
        class_4.attr("id", topRatedMovies[val_3].movie_id);
        class_5.attr("id", topRatedMovies[val_4].movie_id);


        circle_1.attr("id", topRatedMovies[val_0].movie_id);
        circle_2.attr("id", topRatedMovies[val_1].movie_id);
        circle_3.attr("id", topRatedMovies[val_2].movie_id);
        circle_4.attr("id", topRatedMovies[val_3].movie_id);
        circle_5.attr("id", topRatedMovies[val_4].movie_id);

        info_1.attr("id", topRatedMovies[val_0].movie_id);
        info_2.attr("id", topRatedMovies[val_1].movie_id);
        info_3.attr("id", topRatedMovies[val_2].movie_id);
        info_4.attr("id", topRatedMovies[val_3].movie_id);
        info_5.attr("id", topRatedMovies[val_4].movie_id);

        $(".next_row_1").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var next_1 = val_0 + 5;
            var next_2 = val_1 + 5;
            var next_3 = val_2 + 5;
            var next_4 = val_3 + 5;
            var next_5 = val_4 + 5;

            if (next_5 <= topRatedMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
                val_4 = next_5;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
                val_4 = 4;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);
            rate_3.text(topRatedMovies[val_3].rating);
            rate_4.text(topRatedMovies[val_4].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);
            name_3.text(topRatedMovies[val_3].name);
            name_4.text(topRatedMovies[val_4].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);
            class_4.attr("id", topRatedMovies[val_3].movie_id);
            class_5.attr("id", topRatedMovies[val_4].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);
            circle_4.attr("id", topRatedMovies[val_3].movie_id);
            circle_5.attr("id", topRatedMovies[val_4].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);
            info_4.attr("id", topRatedMovies[val_3].movie_id);
            info_5.attr("id", topRatedMovies[val_4].movie_id);

        });

        $(".previous_row_1").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var previous_1 = val_0 - 5;
            var previous_2 = val_1 - 5;
            var previous_3 = val_2 - 5;
            var previous_4 = val_3 - 5;
            var previous_5 = val_4 - 5;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
                val_4 = previous_5;
            }
            else {
                val_0 = 15;
                val_1 = 16;
                val_2 = 17;
                val_3 = 18;
                val_4 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);
            rate_3.text(topRatedMovies[val_3].rating);
            rate_4.text(topRatedMovies[val_4].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);
            name_3.text(topRatedMovies[val_3].name);
            name_4.text(topRatedMovies[val_4].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);
            class_4.attr("id", topRatedMovies[val_3].movie_id);
            class_5.attr("id", topRatedMovies[val_4].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);
            circle_4.attr("id", topRatedMovies[val_3].movie_id);
            circle_5.attr("id", topRatedMovies[val_4].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);
            info_4.attr("id", topRatedMovies[val_3].movie_id);
            info_5.attr("id", topRatedMovies[val_4].movie_id);

        });
        // console.log(topRatedMovies);

    };

    this.displayUpcomingPosters = async () => {
        var upcomingMovies = await this.business.getResolvedUpcomingMovies();
        var imgHolder0 = $(".up_img_container_0");
        var imgHolder1 = $(".up_img_container_1");
        var imgHolder2 = $(".up_img_container_2");
        var imgHolder3 = $(".up_img_container_3");
        var imgHolder4 = $(".up_img_container_4");

        var rate_0 = $(".up_rate_0");
        var rate_1 = $(".up_rate_1");
        var rate_2 = $(".up_rate_2");
        var rate_3 = $(".up_rate_3");
        var rate_4 = $(".up_rate_4");

        var name_0 = $(".up_name_0");
        var name_1 = $(".up_name_1");
        var name_2 = $(".up_name_2");
        var name_3 = $(".up_name_3");
        var name_4 = $(".up_name_4");

        var class_1 = $(".up_button_1");
        var class_2 = $(".up_button_2");
        var class_3 = $(".up_button_3");
        var class_4 = $(".up_button_4");
        var class_5 = $(".up_button_5");

        var circle_1 = $(".up_circle_1");
        var circle_2 = $(".up_circle_2");
        var circle_3 = $(".up_circle_3");
        var circle_4 = $(".up_circle_4");
        var circle_5 = $(".up_circle_5");

        var info_1 = $(".up_info_1");
        var info_2 = $(".up_info_2");
        var info_3 = $(".up_info_3");
        var info_4 = $(".up_info_4");
        var info_5 = $(".up_info_5");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
        val_4 = 4;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")");
        imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_4].poster + ")");

        rate_0.text(upcomingMovies[val_0].rating);
        rate_1.text(upcomingMovies[val_1].rating);
        rate_2.text(upcomingMovies[val_2].rating);
        rate_3.text(upcomingMovies[val_3].rating);
        rate_4.text(upcomingMovies[val_4].rating);

        name_0.text(upcomingMovies[val_0].name);
        name_1.text(upcomingMovies[val_1].name);
        name_2.text(upcomingMovies[val_2].name);
        name_3.text(upcomingMovies[val_3].name);
        name_4.text(upcomingMovies[val_4].name);

        class_1.attr("id", upcomingMovies[val_0].movie_id);
        class_2.attr("id", upcomingMovies[val_1].movie_id);
        class_3.attr("id", upcomingMovies[val_2].movie_id);
        class_4.attr("id", upcomingMovies[val_3].movie_id);
        class_5.attr("id", upcomingMovies[val_4].movie_id);


        circle_1.attr("id", upcomingMovies[val_0].movie_id);
        circle_2.attr("id", upcomingMovies[val_1].movie_id);
        circle_3.attr("id", upcomingMovies[val_2].movie_id);
        circle_4.attr("id", upcomingMovies[val_3].movie_id);
        circle_5.attr("id", upcomingMovies[val_4].movie_id);

        info_1.attr("id", upcomingMovies[val_0].movie_id);
        info_2.attr("id", upcomingMovies[val_1].movie_id);
        info_3.attr("id", upcomingMovies[val_2].movie_id);
        info_4.attr("id", upcomingMovies[val_3].movie_id);
        info_5.attr("id", upcomingMovies[val_4].movie_id);

        $(".next_row_2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var next_1 = val_0 + 5;
            var next_2 = val_1 + 5;
            var next_3 = val_2 + 5;
            var next_4 = val_3 + 5;
            var next_5 = val_4 + 5;

            if (next_5 <= upcomingMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
                val_4 = next_5;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
                val_4 = 4;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);
            rate_3.text(upcomingMovies[val_3].rating);
            rate_4.text(upcomingMovies[val_4].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);
            name_3.text(upcomingMovies[val_3].name);
            name_4.text(upcomingMovies[val_4].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);
            class_4.attr("id", upcomingMovies[val_3].movie_id);
            class_5.attr("id", upcomingMovies[val_4].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);
            circle_4.attr("id", upcomingMovies[val_3].movie_id);
            circle_5.attr("id", upcomingMovies[val_4].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);
            info_4.attr("id", upcomingMovies[val_3].movie_id);
            info_5.attr("id", upcomingMovies[val_4].movie_id);

        });

        $(".previous_row_2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var previous_1 = val_0 - 5;
            var previous_2 = val_1 - 5;
            var previous_3 = val_2 - 5;
            var previous_4 = val_3 - 5;
            var previous_5 = val_4 - 5;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
                val_4 = previous_5;
            }
            else {
                val_0 = 15;
                val_1 = 16;
                val_2 = 17;
                val_3 = 18;
                val_4 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);
            rate_3.text(upcomingMovies[val_3].rating);
            rate_4.text(upcomingMovies[val_4].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);
            name_3.text(upcomingMovies[val_3].name);
            name_4.text(upcomingMovies[val_4].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);
            class_4.attr("id", upcomingMovies[val_3].movie_id);
            class_5.attr("id", upcomingMovies[val_4].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);
            circle_4.attr("id", upcomingMovies[val_3].movie_id);
            circle_5.attr("id", upcomingMovies[val_4].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);
            info_4.attr("id", upcomingMovies[val_3].movie_id);
            info_5.attr("id", upcomingMovies[val_4].movie_id);

        });
        // console.log(upcomingMovies);
    };

    this.displayNowPlayingPage = async (pageNum) => {
        var pageNum = 1;
        var nowPlayingMovies = await this.business.getResolvedNowPlayingMoviesPage(pageNum);
        // console.log(nowPlayingMovies)
        var results = nowPlayingMovies.results;
        var nowPlaying = [];
        for (let i = 0; i < results.length; i++) {
            var temp = {
                name: results[i].title,
                poster: results[i].poster_path,
                backdrop: results[i].backdrop_path,
                rating: results[i].vote_average,
                movie_id: results[i].id
            };
            nowPlaying.push(temp);
        }

        var mainContainer = $(".now_playing_container");
        $(".page_number").text(pageNum);
        for (let i = 0; i < results.length; i++) {
            var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
            var poster = $("<div>").attr("class", "poster_holder_style");
            var infoBox = $("<div>").attr("class", "info_holder");
            var rateBox = $("<div>").attr("class", "rate_box_holder");
            var star = $("<i>").attr("class", "fa fa-star");
            var rate = $("<p>").attr("class", "rate_style");
            var movieName = $("<p>").attr("class", "name_style");
            var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_now_playing");
            var iFont = $("<i>").attr("class", "fa fa-info-circle");
            var infoText = $("<p>").attr("class", "more_info");

            poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + nowPlaying[i].poster + ")");
            rate.text(nowPlaying[i].rating);
            movieName.text(nowPlaying[i].name);
            infoText.text("More Info");
            buttonDiv.attr("id", nowPlaying[i].movie_id);
            iFont.attr("id", nowPlaying[i].movie_id);
            infoText.attr("id", nowPlaying[i].movie_id);

            infoBox.append(rateBox);
            rateBox.append(star);
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(rate);
            infoBox.append(movieName);
            infoBox.append(buttonDiv);
            buttonDiv.append(iFont);
            buttonDiv.append(infoText);
            movieBox.append(poster);
            movieBox.append(infoBox);
            mainContainer.append(movieBox);
        }
        var allPages = nowPlayingMovies.total_pages;
        $(".next_page").on("click", async event => {

            var next = pageNum + 1;

            if (next < allPages) {
                pageNum = next;
            }
            mainContainer.html("");
            var nowPlayingMovies = await this.business.getResolvedNowPlayingMoviesPage(pageNum);
            console.log(nowPlayingMovies.results);
            $(".page_number").text(pageNum);
            for (let i = 0; i < nowPlayingMovies.results.length; i++) {
                var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
                var poster = $("<div>").attr("class", "poster_holder_style");
                var infoBox = $("<div>").attr("class", "info_holder");
                var rateBox = $("<div>").attr("class", "rate_box_holder");
                var star = $("<i>").attr("class", "fa fa-star");
                var rate = $("<p>").attr("class", "rate_style");
                var movieName = $("<p>").attr("class", "name_style");
                var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_now_playing");
                var iFont = $("<i>").attr("class", "fa fa-info-circle");
                var infoText = $("<p>").attr("class", "more_info");

                poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + nowPlayingMovies.results[i].poster_path + ")");
                rate.text(nowPlayingMovies.results[i].vote_average);
                movieName.text(nowPlayingMovies.results[i].title);
                infoText.text("More Info");
                buttonDiv.attr("id", nowPlayingMovies.results[i].id);
                iFont.attr("id", nowPlayingMovies.results[i].id);
                infoText.attr("id", nowPlayingMovies.results[i].id);

                infoBox.append(rateBox);
                rateBox.append(star);
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(rate);
                infoBox.append(movieName);
                infoBox.append(buttonDiv);
                buttonDiv.append(iFont);
                buttonDiv.append(infoText);
                movieBox.append(poster);
                movieBox.append(infoBox);
                mainContainer.append(movieBox);
            }
            $(".more_info_now_playing").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/now_playing.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".previous_page").on("click", async event => {

            var previous = pageNum - 1;

            if (previous > 0) {
                pageNum = previous;
            }
            mainContainer.html("");
            var nowPlayingMovies = await this.business.getResolvedNowPlayingMoviesPage(pageNum);
            console.log(nowPlayingMovies.results);
            $(".page_number").text(pageNum);
            for (let i = 0; i < nowPlayingMovies.results.length; i++) {
                var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
                var poster = $("<div>").attr("class", "poster_holder_style");
                var infoBox = $("<div>").attr("class", "info_holder");
                var rateBox = $("<div>").attr("class", "rate_box_holder");
                var star = $("<i>").attr("class", "fa fa-star");
                var rate = $("<p>").attr("class", "rate_style");
                var movieName = $("<p>").attr("class", "name_style");
                var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_now_playing");
                var iFont = $("<i>").attr("class", "fa fa-info-circle");
                var infoText = $("<p>").attr("class", "more_info");

                poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + nowPlayingMovies.results[i].poster_path + ")");
                rate.text(nowPlayingMovies.results[i].vote_average);
                movieName.text(nowPlayingMovies.results[i].title);
                infoText.text("More Info");
                buttonDiv.attr("id", nowPlayingMovies.results[i].id);
                iFont.attr("id", nowPlayingMovies.results[i].id);
                infoText.attr("id", nowPlayingMovies.results[i].id);

                infoBox.append(rateBox);
                rateBox.append(star);
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(rate);
                infoBox.append(movieName);
                infoBox.append(buttonDiv);
                buttonDiv.append(iFont);
                buttonDiv.append(infoText);
                movieBox.append(poster);
                movieBox.append(infoBox);
                mainContainer.append(movieBox);
            }
            $(".more_info_now_playing").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/now_playing.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".more_info_now_playing").on("click", async event => {
            var movieId = $(event.target).attr('id');
            var backPage = "../categories/now_playing.html";
            sessionStorage.setItem('backPage', backPage);
            sessionStorage.setItem('movieId', movieId);
            window.location = "../details/movie_details.html";
        });
    };

    this.displayPopularMoviesPage = async (pageNum) => {
        pageNum = 1;
        var popularMovies = await this.business.getResolvedPopularMoviesPage(pageNum);
        // console.log(popularMovies)
        var mainContainer = $(".link_main_movie_container");

        mainContainer.html("");
        for (let i = 0; i < popularMovies.results.length; i++) {
            var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
            var poster = $("<div>").attr("class", "poster_holder_style");
            var infoBox = $("<div>").attr("class", "info_holder");
            var rateBox = $("<div>").attr("class", "rate_box_holder");
            var star = $("<i>").attr("class", "fa fa-star");
            var rate = $("<p>").attr("class", "rate_style");
            var movieName = $("<p>").attr("class", "name_style");
            var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_popular_button");
            var iFont = $("<i>").attr("class", "fa fa-info-circle");
            var infoText = $("<p>").attr("class", "more_info");

            poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies.results[i].poster_path + ")");
            rate.text(popularMovies.results[i].vote_average);
            movieName.text(popularMovies.results[i].title);
            infoText.text("More Info");
            buttonDiv.attr("id", popularMovies.results[i].id);
            iFont.attr("id", popularMovies.results[i].id);
            infoText.attr("id", popularMovies.results[i].id);

            infoBox.append(rateBox);
            rateBox.append(star);
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(star.clone());
            rateBox.append(rate);
            infoBox.append(movieName);
            infoBox.append(buttonDiv);
            buttonDiv.append(iFont);
            buttonDiv.append(infoText);
            movieBox.append(poster);
            movieBox.append(infoBox);
            mainContainer.append(movieBox);
        }
        var buttonContainer = $(".page_button_container");
        var leftButton = $("<div>").attr("class", "page_button_style button_left previous_page_popular");
        var bottomNumber = $("<h1>").attr("class", "bottom_page_number page_number_style").text(pageNum);
        var rightButton = $("<div>").attr("class", "page_button_style button_right next_page_popular");
        var left = $("<i>").attr("class", "fa fa-angle-left");
        var right = $("<i>").attr("class", "fa fa-angle-right");
        leftButton.append(left);
        rightButton.append(right);
        buttonContainer.append(leftButton);
        buttonContainer.append(bottomNumber);
        buttonContainer.append(rightButton);

        var allPages = popularMovies.total_pages;
        $(".next_page_popular").on("click", async event => {

            var next = pageNum + 1;

            if (next < allPages) {
                pageNum = next;
            }
            mainContainer.html("");
            var popularMovies = await this.business.getResolvedPopularMoviesPage(pageNum);
            console.log(popularMovies.results);
            bottomNumber.text(pageNum);
            for (let i = 0; i < popularMovies.results.length; i++) {
                var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
                var poster = $("<div>").attr("class", "poster_holder_style");
                var infoBox = $("<div>").attr("class", "info_holder");
                var rateBox = $("<div>").attr("class", "rate_box_holder");
                var star = $("<i>").attr("class", "fa fa-star");
                var rate = $("<p>").attr("class", "rate_style");
                var movieName = $("<p>").attr("class", "name_style");
                var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_popular_button");
                var iFont = $("<i>").attr("class", "fa fa-info-circle");
                var infoText = $("<p>").attr("class", "more_info");

                poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies.results[i].poster_path + ")");
                rate.text(popularMovies.results[i].vote_average);
                movieName.text(popularMovies.results[i].title);
                infoText.text("More Info");
                buttonDiv.attr("id", popularMovies.results[i].id);
                iFont.attr("id", popularMovies.results[i].id);
                infoText.attr("id", popularMovies.results[i].id);

                infoBox.append(rateBox);
                rateBox.append(star);
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(rate);
                infoBox.append(movieName);
                infoBox.append(buttonDiv);
                buttonDiv.append(iFont);
                buttonDiv.append(infoText);
                movieBox.append(poster);
                movieBox.append(infoBox);
                mainContainer.append(movieBox);
            }

            $(".more_info_popular_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/popular_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".previous_page_popular").on("click", async event => {

            var previous = pageNum - 1;

            if (previous > 0) {
                pageNum = previous;
            }
            mainContainer.html("");
            var popularMovies = await this.business.getResolvedPopularMoviesPage(pageNum);
            console.log(popularMovies.results);
            bottomNumber.text(pageNum);
            for (let i = 0; i < popularMovies.results.length; i++) {
                var movieBox = $("<div>").attr("class", "movie_poster_box movie_box_style");
                var poster = $("<div>").attr("class", "poster_holder_style");
                var infoBox = $("<div>").attr("class", "info_holder");
                var rateBox = $("<div>").attr("class", "rate_box_holder");
                var star = $("<i>").attr("class", "fa fa-star");
                var rate = $("<p>").attr("class", "rate_style");
                var movieName = $("<p>").attr("class", "name_style");
                var buttonDiv = $("<div>").attr("class", "more_info_button_style more_info_popular_button");
                var iFont = $("<i>").attr("class", "fa fa-info-circle");
                var infoText = $("<p>").attr("class", "more_info");

                poster.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies.results[i].poster_path + ")");
                rate.text(popularMovies.results[i].vote_average);
                movieName.text(popularMovies.results[i].title);
                infoText.text("More Info");
                buttonDiv.attr("id", popularMovies.results[i].id);
                iFont.attr("id", popularMovies.results[i].id);
                infoText.attr("id", popularMovies.results[i].id);

                infoBox.append(rateBox);
                rateBox.append(star);
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(star.clone());
                rateBox.append(rate);
                infoBox.append(movieName);
                infoBox.append(buttonDiv);
                buttonDiv.append(iFont);
                buttonDiv.append(infoText);
                movieBox.append(poster);
                movieBox.append(infoBox);
                mainContainer.append(movieBox);
            }

            $(".more_info_popular_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/popular_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".more_info_popular_button").on("click", async event => {
            var movieId = $(event.target).attr('id');
            var backPage = "../categories/popular_movies.html";
            sessionStorage.setItem('backPage', backPage);
            sessionStorage.setItem('movieId', movieId);
            window.location = "../details/movie_details.html";
        });
    };

    this.displayTopRatedPage = async (pageNum) => {
        var pageNum = 1;
        var topRatedMovies = await this.business.getResolvedTopRatedMoviesPage(pageNum);
        var mainContainer = $(".top_rated_main_link_container");
        // var results = nowPlayingMovies.results;
        mainContainer.html('');
        var output = '';
        $(".top_rated_page_number").text(pageNum);
        $.each(topRatedMovies, (index, movie) => {
            output += `
            <div class="movie_poster_box movie_box_style" >
              <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
              </div>
                <div class="info_holder">
                    <div class="rate_box_holder">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <p class="rate_style">${movie.rating}</p>
                    </div>
                   <p class="name_style">${movie.name}</p>
                   
                        <div class="more_info_button_style more_info_top_rated_button" id="${movie.movie_id}">
                            <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                            <p class="more_info" id="${movie.movie_id}">More Info</p>
                        </div>
                </div>
            </div>
            `;
        });
        mainContainer.html(output);
        var totalPages = topRatedMovies[0].all_pages;
        $(".next_top_rated_page").on("click", async event => {
            mainContainer.html('');
            var output = '';
            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
            }
            var topRatedMovies = await this.business.getResolvedTopRatedMoviesPage(pageNum);
            $(".top_rated_page_number").text(pageNum);

            $.each(topRatedMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style" >
                  <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                  </div>
                    <div class="info_holder">
                        <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                        </div>
                       <p class="name_style">${movie.name}</p>
                       
                            <div class="more_info_button_style more_info_top_rated_button" id="${movie.movie_id}">
                                <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                <p class="more_info" id="${movie.movie_id}">More Info</p>
                            </div>
                    </div>
                </div>
                `;
            });

            mainContainer.html(output);
            $(".more_info_top_rated_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/top_rated_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".previous_top_rated_page").on("click", async event => {

            var output = '';
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }

            var topRatedMovies = await this.business.getResolvedTopRatedMoviesPage(pageNum);
            $(".top_rated_page_number").text(pageNum);

            $.each(topRatedMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style" >
                  <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                  </div>
                    <div class="info_holder">
                        <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                        </div>
                       <p class="name_style">${movie.name}</p>
                       
                            <div class="more_info_button_style more_info_top_rated_button" id="${movie.movie_id}">
                                <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                <p class="more_info" id="${movie.movie_id}">More Info</p>
                            </div>
                    </div>
                </div>
                `;
            });

            mainContainer.html(output);
            $(".more_info_top_rated_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/top_rated_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });
        $(".more_info_top_rated_button").on("click", async event => {
            var movieId = $(event.target).attr('id');
            var backPage = "../categories/top_rated_movies.html";
            sessionStorage.setItem('backPage', backPage);
            sessionStorage.setItem('movieId', movieId);
            window.location = "../details/movie_details.html";
        });
        // console.log(topRatedMovies)
    };

    this.displayUpcomingPage = async (pageNum) => {
        var pageNum = 1;
        var upcomingMovies = await this.business.getResolvedUpcomingMoviesPage(pageNum);
        var mainContainer = $(".upcoming_main_link_container");
        mainContainer.html('');
        var output = '';
        $(".upcoming_page_number").text(pageNum);

        $.each(upcomingMovies, (index, movie) => {
            output += `
            <div class="movie_poster_box movie_box_style">
                <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                </div>
                  <div class="info_holder">
                      <div class="rate_box_holder">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <p class="rate_style">${movie.rating}</p>
                      </div>
                        <p class="name_style">${movie.name}</p>
                            <div class="more_info_button_style more_info_upcoming_button" id="${movie.movie_id}">
                                <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                <p class="more_info" id="${movie.movie_id}">More Info</p>
                            </div>
                  </div>
            </div>
            `
        });
        mainContainer.html(output);
        var totalPages = upcomingMovies[0].all_pages;
        $(".next_upcoming_page").on("click", async event => {
            var output = '';
            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
                mainContainer.html('');
            }
            var upcomingMovies = await this.business.getResolvedUpcomingMoviesPage(pageNum);
            $(".upcoming_page_number").text(pageNum);
            $.each(upcomingMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_upcoming_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".more_info_upcoming_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/upcoming_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });

        $(".previous_upcoming_page").on("click", async event => {
            var output = '';
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }
            var upcomingMovies = await this.business.getResolvedUpcomingMoviesPage(pageNum);
            $(".upcoming_page_number").text(pageNum);

            $.each(upcomingMovies, (index, movie) => {
                output += `
                    <div class="movie_poster_box movie_box_style">
                        <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                        </div>
                          <div class="info_holder">
                              <div class="rate_box_holder">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <p class="rate_style">${movie.rating}</p>
                              </div>
                                <p class="name_style">${movie.name}</p>
                                    <div class="more_info_button_style more_info_upcoming_button" id="${movie.movie_id}">
                                        <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                        <p class="more_info" id="${movie.movie_id}">More Info</p>
                                    </div>
                          </div>
                    </div>
                    `
            });
            mainContainer.html(output);
            $(".more_info_upcoming_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../categories/upcoming_movies.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });
        $(".more_info_upcoming_button").on("click", async event => {
            var movieId = $(event.target).attr('id');
            var backPage = "../categories/upcoming_movies.html";
            sessionStorage.setItem('backPage', backPage);
            sessionStorage.setItem('movieId', movieId);
            window.location = "../details/movie_details.html";
        });
        //  console.log(upcomingMovies)
    };

    this.displayShowsIntro = async (pageNum) => {
        pageNum = 1;
        var airingToday = await this.business.getResolvedAiringTodayShows(pageNum);

        var posterImg = $(".big_poster_shows_container");
        var backdropPos = $(".backdrop_image_shows_container");
        var ratingNum = $(".shows_rating_number");
        var showName = $(".show_name");
        var airDiv = $(".airing_today_link");
        var val = 0;
        posterImg.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].poster + ")");
        backdropPos.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].backdrop + ")");
        ratingNum.text(airingToday[val].rating);
        showName.text(airingToday[val].name.substring(0,20) + "...");

        var buttonId = airingToday[val].show_id;

        $(".shows_intro_button").attr("id", buttonId);
        $(".shows_intro_circle").attr("id", buttonId);
        $(".shows_intro_info").attr("id", buttonId);

        $(".next_intro_shows").on("click", async event => {
            posterImg.css("opacity", "0");
            backdropPos.css("opacity", "0");
            var next = val + 1;
            if (next < airingToday.length) {
                val = next;
            }
            else {
                val = 0;
            }
            posterImg.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].poster + ")").css("opacity", "").css("transition", "0.4s");
            backdropPos.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].backdrop + ")").css("opacity", "").css("transition", "0.4s");
            ratingNum.text(airingToday[val].rating);
            showName.text(airingToday[val].name.substring(0,20) + "...");

            $(".shows_intro_button").attr("id", airingToday[val].show_id);
            $(".shows_intro_circle").attr("id", airingToday[val].show_id);
            $(".shows_intro_info").attr("id", airingToday[val].show_id);
        });

        $(".previous_intro_shows").on("click", async event => {
            posterImg.css("opacity", "0");
            backdropPos.css("opacity", "0");
            var previous = val - 1;
            if (previous >= 0) {
                val = previous;
            }
            else {
                var lastIndex = airingToday.length - 1;
                val = lastIndex;
            }
            posterImg.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].poster + ")").css("opacity", "").css("transition", "0.4s");
            backdropPos.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + airingToday[val].backdrop + ")").css("opacity", "").css("transition", "0.4s");
            ratingNum.text(airingToday[val].rating);
            showName.text(airingToday[val].name.substring(0,20) + "...");
            $(".shows_intro_button").attr("id", airingToday[val].show_id);
            $(".shows_intro_circle").attr("id", airingToday[val].show_id);
            $(".shows_intro_info").attr("id", airingToday[val].show_id);
        });
        // console.log(airingToday);
    };


    this.displayTopRatedShowsScroll = async (pageNum) => {
        var pageNum = 1;
        var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);

        var imgHolder0 = $(".top_show_img0");
        var imgHolder1 = $(".top_show_img1");
        var imgHolder2 = $(".top_show_img2");
        var imgHolder3 = $(".top_show_img3");
        var imgHolder4 = $(".top_show_img4");

        var rate_0 = $(".top_show_rate0");
        var rate_1 = $(".top_show_rate1");
        var rate_2 = $(".top_show_rate2");
        var rate_3 = $(".top_show_rate3");
        var rate_4 = $(".top_show_rate4");

        var name_0 = $(".top_show_name0");
        var name_1 = $(".top_show_name1");
        var name_2 = $(".top_show_name2");
        var name_3 = $(".top_show_name3");
        var name_4 = $(".top_show_name4");

        var class_1 = $(".top_show_id0");
        var class_2 = $(".top_show_id1");
        var class_3 = $(".top_show_id2");
        var class_4 = $(".top_show_id3");
        var class_5 = $(".top_show_id4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
        val_4 = 4;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")");
        imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_4].poster + ")");

        rate_0.text(topRated[val_0].rating);
        rate_1.text(topRated[val_1].rating);
        rate_2.text(topRated[val_2].rating);
        rate_3.text(topRated[val_3].rating);
        rate_4.text(topRated[val_4].rating);

        name_0.text(topRated[val_0].name);
        name_1.text(topRated[val_1].name);
        name_2.text(topRated[val_2].name);
        name_3.text(topRated[val_3].name);
        name_4.text(topRated[val_4].name);

        class_1.attr("id", topRated[val_0].show_id);
        class_2.attr("id", topRated[val_1].show_id);
        class_3.attr("id", topRated[val_2].show_id);
        class_4.attr("id", topRated[val_3].show_id);
        class_5.attr("id", topRated[val_4].show_id);

        $(".next_top_rated_show_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var next_1 = val_0 + 5;
            var next_2 = val_1 + 5;
            var next_3 = val_2 + 5;
            var next_4 = val_3 + 5;
            var next_5 = val_4 + 5;

            if (next_5 <= topRated.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
                val_4 = next_5;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
                val_4 = 4;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);
            rate_3.text(topRated[val_3].rating);
            rate_4.text(topRated[val_4].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);
            name_3.text(topRated[val_3].name);
            name_4.text(topRated[val_4].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);
            class_4.attr("id", topRated[val_3].show_id);
            class_5.attr("id", topRated[val_4].show_id);

        });

        $(".previous_top_rated_show_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var previous_1 = val_0 - 5;
            var previous_2 = val_1 - 5;
            var previous_3 = val_2 - 5;
            var previous_4 = val_3 - 5;
            var previous_5 = val_4 - 5;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
                val_4 = previous_5;
            }
            else {
                val_0 = 15;
                val_1 = 16;
                val_2 = 17;
                val_3 = 18;
                val_4 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);
            rate_3.text(topRated[val_3].rating);
            rate_4.text(topRated[val_4].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);
            name_3.text(topRated[val_3].name);
            name_4.text(topRated[val_4].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);
            class_4.attr("id", topRated[val_3].show_id);
            class_5.attr("id", topRated[val_4].show_id);
        });
    };



    this.displayPopularShowsScroll = async (pageNum) => {
        var pageNum = 1;
        var popularShows = await this.business.getResolvedPopularTvShows(pageNum);

        var imgHolder0 = $(".pop_show_img0");
        var imgHolder1 = $(".pop_show_img1");
        var imgHolder2 = $(".pop_show_img2");
        var imgHolder3 = $(".pop_show_img3");
        var imgHolder4 = $(".pop_show_img4");

        var rate_0 = $(".pop_show_rate0");
        var rate_1 = $(".pop_show_rate1");
        var rate_2 = $(".pop_show_rate2");
        var rate_3 = $(".pop_show_rate3");
        var rate_4 = $(".pop_show_rate4");

        var name_0 = $(".pop_show_name0");
        var name_1 = $(".pop_show_name1");
        var name_2 = $(".pop_show_name2");
        var name_3 = $(".pop_show_name3");
        var name_4 = $(".pop_show_name4");

        var class_1 = $(".pop_show_id0");
        var class_2 = $(".pop_show_id1");
        var class_3 = $(".pop_show_id2");
        var class_4 = $(".pop_show_id3");
        var class_5 = $(".pop_show_id4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
        val_4 = 4;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")");
        imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_4].poster + ")");

        rate_0.text(popularShows[val_0].rating);
        rate_1.text(popularShows[val_1].rating);
        rate_2.text(popularShows[val_2].rating);
        rate_3.text(popularShows[val_3].rating);
        rate_4.text(popularShows[val_4].rating);

        name_0.text(popularShows[val_0].name);
        name_1.text(popularShows[val_1].name);
        name_2.text(popularShows[val_2].name);
        name_3.text(popularShows[val_3].name);
        name_4.text(popularShows[val_4].name);

        class_1.attr("id", popularShows[val_0].show_id);
        class_2.attr("id", popularShows[val_1].show_id);
        class_3.attr("id", popularShows[val_2].show_id);
        class_4.attr("id", popularShows[val_3].show_id);
        class_5.attr("id", popularShows[val_4].show_id);

        $(".next_popular_show_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var next_1 = val_0 + 5;
            var next_2 = val_1 + 5;
            var next_3 = val_2 + 5;
            var next_4 = val_3 + 5;
            var next_5 = val_4 + 5;

            if (next_5 <= popularShows.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
                val_4 = next_5;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
                val_4 = 4;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);
            rate_3.text(popularShows[val_3].rating);
            rate_4.text(popularShows[val_4].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);
            name_3.text(popularShows[val_3].name);
            name_4.text(popularShows[val_4].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);
            class_4.attr("id", popularShows[val_3].show_id);
            class_5.attr("id", popularShows[val_4].show_id);

        });

        $(".previous_popular_show_row").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
            imgHolder4.css("opacity", "0");

            var previous_1 = val_0 - 5;
            var previous_2 = val_1 - 5;
            var previous_3 = val_2 - 5;
            var previous_4 = val_3 - 5;
            var previous_5 = val_4 - 5;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
                val_4 = previous_5;
            }
            else {
                val_0 = 15;
                val_1 = 16;
                val_2 = 17;
                val_3 = 18;
                val_4 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder4.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_4].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);
            rate_3.text(popularShows[val_3].rating);
            rate_4.text(popularShows[val_4].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);
            name_3.text(popularShows[val_3].name);
            name_4.text(popularShows[val_4].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);
            class_4.attr("id", popularShows[val_3].show_id);
            class_5.attr("id", popularShows[val_4].show_id);
        });
    };


    this.displayPopularShowsPage = async (pageNum) => {
        var pageNum = 1;
        var popularShows = await this.business.getResolvedPopularTvShows(pageNum);

        var mainContainer = $(".popular_shows_main_link_container");
        mainContainer.html('');
        var output = '';
        $(".popular_shows_page_number").text(pageNum);

        $.each(popularShows, (index, movie) => {
            output += `
            <div class="movie_poster_box movie_box_style">
                <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                </div>
                  <div class="info_holder">
                      <div class="rate_box_holder">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <p class="rate_style">${movie.rating}</p>
                      </div>
                        <p class="name_style">${movie.name}</p>
                            <div class="more_info_button_style more_info_popular_shows_button" id="${movie.show_id}">
                                <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                <p class="more_info" id="${movie.show_id}">More Info</p>
                            </div>
                  </div>
            </div>
            `
        });
        mainContainer.html(output);
        var totalPages = popularShows[0].all_pages;
        $(".next_popular_shows_page").on("click", async event => {
            var output = '';
            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
                mainContainer.html('');
            }
            var popularShows = await this.business.getResolvedPopularTvShows(pageNum);
            $(".popular_shows_page_number").text(pageNum);
            $.each(popularShows, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_popular_shows_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".more_info_popular_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/popular_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });

        $(".previous_popular_shows_page").on("click", async event => {
            var output = '';
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }
            var popularShows = await this.business.getResolvedPopularTvShows(pageNum);
            $(".popular_shows_page_number").text(pageNum);

            $.each(popularShows, (index, movie) => {
                output += `
                    <div class="movie_poster_box movie_box_style">
                        <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                        </div>
                          <div class="info_holder">
                              <div class="rate_box_holder">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <p class="rate_style">${movie.rating}</p>
                              </div>
                                <p class="name_style">${movie.name}</p>
                                    <div class="more_info_button_style more_info_popular_shows_button" id="${movie.show_id}">
                                        <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                        <p class="more_info" id="${movie.show_id}">More Info</p>
                                    </div>
                          </div>
                    </div>
                    `
            });
            mainContainer.html(output);
            $(".more_info_popular_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/popular_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });
        $(".more_info_popular_shows_button").on("click", async event => {
            var showId = $(event.target).attr('id');
            var showsBackPage = "../categories/popular_shows.html";
            sessionStorage.setItem('showsBackPage', showsBackPage)
            sessionStorage.setItem('showId', showId);
            window.location = "../details/show_details.html";
        });
        // console.log(popularShows);
    };



    this.displayAiringTodayShowsPage = async (pageNum) => {
        var pageNum = 1;
        var airingToday = await this.business.getResolvedAiringTodayShows(pageNum);

        var mainContainer = $(".airing_today_shows_main_link_container");
        mainContainer.html('');
        var output = '';
        $(".airing_today_shows_page_number").text(pageNum);

        $.each(airingToday, (index, movie) => {
            output += `
            <div class="movie_poster_box movie_box_style">
                <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                </div>
                  <div class="info_holder">
                      <div class="rate_box_holder">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <p class="rate_style">${movie.rating}</p>
                      </div>
                        <p class="name_style">${movie.name}</p>
                            <div class="more_info_button_style more_info_airing_today_button" id="${movie.show_id}">
                                <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                <p class="more_info" id="${movie.show_id}">More Info</p>
                            </div>
                  </div>
            </div>
            `
        });
        mainContainer.html(output);
        var totalPages = airingToday[0].all_pages;
        $(".next_airing_today_shows_page").on("click", async event => {
            var output = '';
            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
                mainContainer.html('');
            }
            var airingToday = await this.business.getResolvedAiringTodayShows(pageNum);
            $(".airing_today_shows_page_number").text(pageNum);
            $.each(airingToday, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_airing_today_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".more_info_airing_today_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/airing_today.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });

        $(".previous_airing_today_shows_page").on("click", async event => {
            var output = '';
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }
            var airingToday = await this.business.getResolvedAiringTodayShows(pageNum);
            $(".airing_today_shows_page_number").text(pageNum);

            $.each(airingToday, (index, movie) => {
                output += `
                    <div class="movie_poster_box movie_box_style">
                        <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                        </div>
                          <div class="info_holder">
                              <div class="rate_box_holder">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <p class="rate_style">${movie.rating}</p>
                              </div>
                                <p class="name_style">${movie.name}</p>
                                    <div class="more_info_button_style more_info_airing_today_button" id="${movie.show_id}">
                                        <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                        <p class="more_info" id="${movie.show_id}">More Info</p>
                                    </div>
                          </div>
                    </div>
                    `
            });
            mainContainer.html(output);
            $(".more_info_airing_today_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/airing_today.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });
        $(".more_info_airing_today_button").on("click", async event => {
            var showId = $(event.target).attr('id');
            var showsBackPage = "../categories/airing_today.html";
            sessionStorage.setItem('showsBackPage', showsBackPage)
            sessionStorage.setItem('showId', showId);
            window.location = "../details/show_details.html";
        });
        // console.log(totalPages);
    };


    this.displayTopRatedShowsPage = async (pageNum) => {
        var pageNum = 1;
        var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);

        var mainContainer = $(".top_rated_shows_main_link_container");
        mainContainer.html('');
        var output = '';
        $(".top_rated_shows_page_number").text(pageNum);

        $.each(topRated, (index, movie) => {
            output += `
            <div class="movie_poster_box movie_box_style">
                <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                </div>
                  <div class="info_holder">
                      <div class="rate_box_holder">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <p class="rate_style">${movie.rating}</p>
                      </div>
                        <p class="name_style">${movie.name}</p>
                            <div class="more_info_button_style more_info_top_shows_button" id="${movie.show_id}">
                                <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                <p class="more_info" id="${movie.show_id}">More Info</p>
                            </div>
                  </div>
            </div>
            `
        });
        mainContainer.html(output);
        var totalPages = topRated[0].all_pages;
        $(".next_top_rated_shows_page").on("click", async event => {
            var output = '';
            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
                mainContainer.html('');
            }
            var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);
            $(".top_rated_shows_page_number").text(pageNum);
            $.each(topRated, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_top_shows_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".more_info_top_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/top_rated_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });

        $(".previous_top_rated_shows_page").on("click", async event => {
            var output = '';
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }
            var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);
            $(".top_rated_shows_page_number").text(pageNum);

            $.each(topRated, (index, movie) => {
                output += `
                    <div class="movie_poster_box movie_box_style">
                        <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                        </div>
                          <div class="info_holder">
                              <div class="rate_box_holder">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <p class="rate_style">${movie.rating}</p>
                              </div>
                                <p class="name_style">${movie.name}</p>
                                    <div class="more_info_button_style more_info_top_shows_button" id="${movie.show_id}">
                                        <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                        <p class="more_info" id="${movie.show_id}">More Info</p>
                                    </div>
                          </div>
                    </div>
                    `
            });
            mainContainer.html(output);
            $(".more_info_top_shows_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../categories/top_rated_shows.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
        });
        $(".more_info_top_shows_button").on("click", async event => {
            var showId = $(event.target).attr('id');
            var showsBackPage = "../categories/top_rated_shows.html";
            sessionStorage.setItem('showsBackPage', showsBackPage)
            sessionStorage.setItem('showId', showId);
            window.location = "../details/show_details.html";
        });
        // console.log(totalPages);
    };

    this.displayMoviesByGenre = async (pageNum, genreNum) => {
        var pageNum;
        var mainContainer = $(".movie_genre_modal_main_container");
        var body = $("body");
        var popup = $(".movie_genre_modal");
        var close = $(".close_modal i.bx-x-circle");

        var genreNum;
        var genreMovies;
        var output = '';
        var totalPages;
        $(".genre_box_style").on("click", async event => {
            pageNum = 1;
            mainContainer.html('');
            genreNum = $(event.target).attr('id');
            genreQuery=$(event.target).text();
            console.log(genreQuery)
            genreMovies = await this.business.getResolvedGenreMovies(pageNum, genreNum);
            output = '';
            totalPages = genreMovies[0].all_pages;
            $.each(genreMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_movie_genre_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            popup.css("display", "block").css("height", "100vh").css("transition", "0.4s");
            body.css("overflow", "hidden");
            $(".movie_genre_page_number").text(pageNum);
            $(".movie_genre_current_nav").text(genreQuery);

            $(".more_info_movie_genre_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../genre/movies_genre.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
            // console.log(genreNum);
        });
        close.on("click", async event => {
            $(".movie_genre_modal").css("height", "0vh").css("display", "none").css("transition", "0.4s");
            $("body").css("overflow", "auto");

        });


        $(".previous_movie_genre_page").on("click", async event => {
            var previous = pageNum - 1;
            if (previous > 0) {
                pageNum = previous;
                mainContainer.html('');
            }
            genreMovies = await this.business.getResolvedGenreMovies(pageNum, genreNum);
            output = '';
            $.each(genreMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_movie_genre_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".movie_genre_page_number").text(pageNum);
            console.log(genreNum)
            $(".more_info_movie_genre_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../genre/movies_genre.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });


        $(".next_movie_genre_page").on("click", async event => {

            var next = pageNum + 1;
            if (next < totalPages) {
                pageNum = next;
                mainContainer.html('');
            }
            var genreMovies = await this.business.getResolvedGenreMovies(pageNum, genreNum);
            var output = '';

            $.each(genreMovies, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_movie_genre_button" id="${movie.movie_id}">
                                    <i class="fa fa-info-circle" id="${movie.movie_id}"></i>
                                    <p class="more_info" id="${movie.movie_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".movie_genre_page_number").text(pageNum);
            console.log(genreNum)
            $(".more_info_movie_genre_button").on("click", async event => {
                var movieId = $(event.target).attr('id');
                var backPage = "../genre/movies_genre.html";
                sessionStorage.setItem('backPage', backPage);
                sessionStorage.setItem('movieId', movieId);
                window.location = "../details/movie_details.html";
            });
        });
        // console.log(genreMovies)
    };

    this.displayShowsByGenre = async (pageNum, genreNum) => {
        var pageNum;
        var genreNum;
        var body = $("body");
        var mainContainer = $(".show_genre_modal_main_container");
        var popup = $(".show_genre_modal");
        var genreShows;
        var close = $(".show_close_modal i.bx-x-circle");
        var output = '';
        var totalPages;
        $(".genre_show_box_style").on("click", async event => {
            mainContainer.html('');
            pageNum = 1;
            genreNum = $(event.target).attr('id');
            genreQuery=$(event.target).text();
            genreShows = await this.business.getResolvedGenreShows(pageNum, genreNum);
            output = '';
            totalPages = genreShows[0].all_pages;
            $.each(genreShows, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_show_genre_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".show_genre_page_number").text(pageNum)
            popup.css("display", "block").css("height", "100vh");
            body.css("overflow", "hidden");
            $(".show_genre_current_nav").text(genreQuery);
            $(".more_info_show_genre_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../genre/tv_shows_genre.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
            // console.log(genreNum);
            // console.log(pageNum);
            // console.log(genreShows);
        });

        close.on("click", async event => {
            popup.css("height", "0vh").css("display", "none");
            body.css("overflow", "auto");
        });

        $(".previous_show_genre_page").on("click", async event => {
            var previous = pageNum - 1;
            if (previous > 0) {
                mainContainer.html('');
                pageNum = previous;
            }
            genreShows = await this.business.getResolvedGenreShows(pageNum, genreNum);
            output = '';
            $.each(genreShows, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_show_genre_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".show_genre_page_number").text(pageNum);
            $(".more_info_show_genre_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../genre/tv_shows_genre.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
            // console.log(genreNum);
            // console.log(pageNum);
            // console.log(genreShows);
        });

        $(".next_show_genre_page").on("click", async event => {
            var next = pageNum + 1;
            if (next < totalPages) {
                mainContainer.html('');
                pageNum = next;
            }
            genreShows = await this.business.getResolvedGenreShows(pageNum, genreNum);
            output = '';
            $.each(genreShows, (index, movie) => {
                output += `
                <div class="movie_poster_box movie_box_style">
                    <div class="poster_holder_style" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}')">
                    </div>
                      <div class="info_holder">
                          <div class="rate_box_holder">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <p class="rate_style">${movie.rating}</p>
                          </div>
                            <p class="name_style">${movie.name}</p>
                                <div class="more_info_button_style more_info_show_genre_button" id="${movie.show_id}">
                                    <i class="fa fa-info-circle" id="${movie.show_id}"></i>
                                    <p class="more_info" id="${movie.show_id}">More Info</p>
                                </div>
                      </div>
                </div>
                `
            });
            mainContainer.html(output);
            $(".show_genre_page_number").text(pageNum);
            $(".more_info_show_genre_button").on("click", async event => {
                var showId = $(event.target).attr('id');
                var showsBackPage = "../genre/tv_shows_genre.html";
                sessionStorage.setItem('showsBackPage', showsBackPage)
                sessionStorage.setItem('showId', showId);
                window.location = "../details/show_details.html";
            });
            // console.log(genreNum);
            // console.log(pageNum);
            // console.log(genreShows);
        });
    };

    this.displayMovieDetails = async (idNum) => {
        var mainContainer = $(".details_main_wrapper");

        var movieDetails;
        var idNum;
        $(".more_info_button").on("click", async event => {
            var movieId = $(event.target).attr('id');
            var backPage = "../index.html";
            sessionStorage.setItem('backPage', backPage)
            sessionStorage.setItem('movieId', movieId);
            window.location = "../details/movie_details.html";
        });
        var genres = [];
        var idNum = sessionStorage.getItem('movieId');
        var goBack = sessionStorage.getItem('backPage');
        movieDetails = await this.business.getResolvedMovieDetails(idNum);
        for (let i = 1; i < movieDetails.length; i++) {
            var genre = [movieDetails[i].genre_name]
            genres.push(genre);
        }

        // console.log(genres)
        var output = `
        
        <div class="movie_details_main_container" style="background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('https://image.tmdb.org/t/p/original${movieDetails[0].backdrop_poster}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: center center;">
        <div class="details_poster_wrapper">
          <div class="details_poster_container" style="background-image: url('https://image.tmdb.org/t/p/original${movieDetails[0].poster}')">
  
          </div>
        </div>
  
  
        <div class="details_backdrop_container">
          <div class="details_box">
            <div class="details_movie_name">
              <h1 class="details_name_header">${movieDetails[0].name}</h1>
              <div class="details_button_container">
              <a href="${goBack}" class="go_back_link">
                <div class="details_go_back_button">
                  <i class="fa fa-arrow-left"></i>
                  <p class="details_go_back">Go Back</p>
                </div>
              </a>
            </div>
            </div>
            <div class="details_rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p class="details_rating_number">${movieDetails[0].rating}</p>
            </div>
            <div class="all_details_container">
              <p class="release_date">Release date: ${movieDetails[0].release_date}</p>
              <p class="movie_budget">Budget: ${movieDetails[0].budget}$</p>
              <p class="movie_duration">Duration: ${movieDetails[0].duration} minutes</p>
              <p class="original_title">Original title: ${movieDetails[0].original_title}</p>
              <p class="genre_names">Genres: ${genres}</p>
              <p class="movie_overview">Overview: ${movieDetails[0].overview}</p>
            </div>
          </div>
        </div>
      </div>
        `

        mainContainer.html(output);
        // $(".movie_details_main_container").css("background", "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(" + "https://image.tmdb.org/t/p/original" + movieDetails[0].backdrop_poster + ")")
        //     .css("background-repeat", "no-repeat").css("background-size", "100% 100%");
        // $(".details_poster_container").css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + movieDetails[0].poster + ")");
        // console.log(movieDetails);
    };

    this.displayShowsDetails = async (idNum) => {
        var mainContainer = $(".show_details_main_wrapper");
        var idButton = $(".shows_more_info_button");
        var idNum;
        var showDetails;
        idButton.on("click", async event => {
            var showId = $(event.target).attr('id');
            var showsBackPage = "../shows/tv_shows.html";
            sessionStorage.setItem('showsBackPage', showsBackPage)
            sessionStorage.setItem('showId', showId);
            window.location = "../details/show_details.html";
        });
        var genres = [];
        var idNum = sessionStorage.getItem('showId');
        var goBack = sessionStorage.getItem('showsBackPage');
        showDetails = await this.business.getResolvedShowDetails(idNum);
        for (let i = 1; i < showDetails.length; i++) {
            var genre = [showDetails[i].genre_name]
            genres.push(genre);
        }
        // console.log(showDetails)
        var output = `
        
        <div class="movie_details_main_container" style="background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('https://image.tmdb.org/t/p/original${showDetails[0].backdrop}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: center center;">
        <div class="details_poster_wrapper">
          <div class="details_poster_container" style="background-image: url('https://image.tmdb.org/t/p/original${showDetails[0].poster}')">
  
          </div>
        </div>
  
  
        <div class="details_backdrop_container">
          <div class="details_box">
            <div class="details_movie_name">
              <h1 class="details_name_header">${showDetails[0].name}</h1>
              <div class="details_button_container">
              <a href="${goBack}" class="go_back_link">
                <div class="details_go_back_button">
                  <i class="fa fa-arrow-left"></i>
                  <p class="details_go_back">Go Back</p>
                </div>
              </a>
            </div>
            </div>
            <div class="details_rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p class="details_rating_number">${showDetails[0].rating}</p>
            </div>
            <div class="all_details_container">
              <p class="release_date">Release date: ${showDetails[0].first_air_date}</p>
              <p class="show_last_air">Last air date: ${showDetails[0].last_air_date}</p>
              <p class="show_seasons">Number of seasons: ${showDetails[0].seasonNum}</p>
              <p class="show_episodes">Number of episodes: ${showDetails[0].episodeNum}</p>
              <p class="original_title">Original title: ${showDetails[0].original_name}</p>
              <p class="genre_names">Genres: ${genres}</p>
              <p class="movie_overview">Overview: ${showDetails[0].overview}</p>
            </div>
          </div>
        </div>
      </div>
        `
        mainContainer.html(output);
    };







    this.displayPopularMoviesBox4 = async () => {
        var popularMovies = await this.business.getResolvedPopularMovies();
        var imgHolder0 = $(".img_container_0_box4");
        var imgHolder1 = $(".img_container_1_box4");
        var imgHolder2 = $(".img_container_2_box4");
        var imgHolder3 = $(".img_container_3_box4");
    
        var rate_0 = $(".rate_0_box4");
        var rate_1 = $(".rate_1_box4");
        var rate_2 = $(".rate_2_box4");
        var rate_3 = $(".rate_3_box4");
    
        var name_0 = $(".name_0_box4");
        var name_1 = $(".name_1_box4");
        var name_2 = $(".name_2_box4");
        var name_3 = $(".name_3_box4");
    
        var class_1 = $(".pop_button_1_box4");
        var class_2 = $(".pop_button_2_box4");
        var class_3 = $(".pop_button_3_box4");
        var class_4 = $(".pop_button_4_box4");
    
        var circle_1 = $(".pop_circle_1_box4");
        var circle_2 = $(".pop_circle_2_box4");
        var circle_3 = $(".pop_circle_3_box4");
        var circle_4 = $(".pop_circle_4_box4");
    
        var info_1 = $(".pop_info_1_box4");
        var info_2 = $(".pop_info_2_box4");
        var info_3 = $(".pop_info_3_box4");
        var info_4 = $(".pop_info_4_box4");
    
        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;
    
        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")");
    
        rate_0.text(popularMovies[val_0].rating);
        rate_1.text(popularMovies[val_1].rating);
        rate_2.text(popularMovies[val_2].rating);
        rate_3.text(popularMovies[val_3].rating);
    
        name_0.text(popularMovies[val_0].name);
        name_1.text(popularMovies[val_1].name);
        name_2.text(popularMovies[val_2].name);
        name_3.text(popularMovies[val_3].name);
    
        class_1.attr("id", popularMovies[val_0].movie_id);
        class_2.attr("id", popularMovies[val_1].movie_id);
        class_3.attr("id", popularMovies[val_2].movie_id);
        class_4.attr("id", popularMovies[val_3].movie_id);
    
        circle_1.attr("id", popularMovies[val_0].movie_id);
        circle_2.attr("id", popularMovies[val_1].movie_id);
        circle_3.attr("id", popularMovies[val_2].movie_id);
        circle_4.attr("id", popularMovies[val_3].movie_id);
    
        info_1.attr("id", popularMovies[val_0].movie_id);
        info_2.attr("id", popularMovies[val_1].movie_id);
        info_3.attr("id", popularMovies[val_2].movie_id);
        info_4.attr("id", popularMovies[val_3].movie_id);
    
        $(".next_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
    
            var next_1 = val_0 + 4;
            var next_2 = val_1 + 4;
            var next_3 = val_2 + 4;
            var next_4 = val_3 + 4;
    
            if (next_4 <= popularMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
            }
            // console.log(val_0, val_1, val_2, val_3)
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
            rate_3.text(popularMovies[val_3].rating);
    
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
            name_3.text(popularMovies[val_3].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
            class_4.attr("id", popularMovies[val_3].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
            circle_4.attr("id", popularMovies[val_3].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
            info_4.attr("id", popularMovies[val_3].movie_id);
    
        });
    
        $(".previous_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");
    
            var previous_1 = val_0 - 4;
            var previous_2 = val_1 - 4;
            var previous_3 = val_2 - 4;
            var previous_4 = val_3 - 4;
    
            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
    
            }
            else {
                val_0 = 16;
                val_1 = 17;
                val_2 = 18;
                val_3 = 19;
            }
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
            rate_3.text(popularMovies[val_3].rating);
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
            name_3.text(popularMovies[val_3].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
            class_4.attr("id", popularMovies[val_3].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
            circle_4.attr("id", popularMovies[val_3].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
            info_4.attr("id", popularMovies[val_3].movie_id);
    
        });
    };



    this.displayPopularMoviesBox3 = async () => {
        var popularMovies = await this.business.getResolvedPopularMovies();
        var imgHolder0 = $(".img_container_0_box3");
        var imgHolder1 = $(".img_container_1_box3");
        var imgHolder2 = $(".img_container_2_box3");
    
        var rate_0 = $(".rate_0_box3");
        var rate_1 = $(".rate_1_box3");
        var rate_2 = $(".rate_2_box3");
    
        var name_0 = $(".name_0_box3");
        var name_1 = $(".name_1_box3");
        var name_2 = $(".name_2_box3");
    
        var class_1 = $(".pop_button_1_box3");
        var class_2 = $(".pop_button_2_box3");
        var class_3 = $(".pop_button_3_box3");
    
        var circle_1 = $(".pop_circle_1_box3");
        var circle_2 = $(".pop_circle_2_box3");
        var circle_3 = $(".pop_circle_3_box3");
    
        var info_1 = $(".pop_info_1_box3");
        var info_2 = $(".pop_info_2_box3");
        var info_3 = $(".pop_info_3_box3");
    
        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
    
        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")");
    
        rate_0.text(popularMovies[val_0].rating);
        rate_1.text(popularMovies[val_1].rating);
        rate_2.text(popularMovies[val_2].rating);
    
        name_0.text(popularMovies[val_0].name);
        name_1.text(popularMovies[val_1].name);
        name_2.text(popularMovies[val_2].name);
    
        class_1.attr("id", popularMovies[val_0].movie_id);
        class_2.attr("id", popularMovies[val_1].movie_id);
        class_3.attr("id", popularMovies[val_2].movie_id);
    
        circle_1.attr("id", popularMovies[val_0].movie_id);
        circle_2.attr("id", popularMovies[val_1].movie_id);
        circle_3.attr("id", popularMovies[val_2].movie_id);
    
        info_1.attr("id", popularMovies[val_0].movie_id);
        info_2.attr("id", popularMovies[val_1].movie_id);
        info_3.attr("id", popularMovies[val_2].movie_id);
    
        $(".next_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
    
            var next_1 = val_0 + 3;
            var next_2 = val_1 + 3;
            var next_3 = val_2 + 3;
    
            if (next_3 < popularMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
            }
            // console.log(val_0, val_1, val_2)
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
    
        });
    
        $(".previous_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
    
            var previous_1 = val_0 - 3;
            var previous_2 = val_1 - 3;
            var previous_3 = val_2 - 3;
    
            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
    
            }
            else {
                val_0 = 17;
                val_1 = 18;
                val_2 = 19;
            }
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
            rate_2.text(popularMovies[val_2].rating);
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
            name_2.text(popularMovies[val_2].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
            class_3.attr("id", popularMovies[val_2].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
            circle_3.attr("id", popularMovies[val_2].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
            info_3.attr("id", popularMovies[val_2].movie_id);
    
        });
    };



    this.displayPopularMoviesBox2 = async () => {
        var popularMovies = await this.business.getResolvedPopularMovies();
        var imgHolder0 = $(".img_container_0_box2");
        var imgHolder1 = $(".img_container_1_box2");
    
        var rate_0 = $(".rate_0_box2");
        var rate_1 = $(".rate_1_box2");
    
        var name_0 = $(".name_0_box2");
        var name_1 = $(".name_1_box2");
    
        var class_1 = $(".pop_button_1_box2");
        var class_2 = $(".pop_button_2_box2");
    
        var circle_1 = $(".pop_circle_1_box2");
        var circle_2 = $(".pop_circle_2_box2");
    
        var info_1 = $(".pop_info_1_box2");
        var info_2 = $(".pop_info_2_box2");
    
        val_0 = 0;
        val_1 = 1;
    
        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")");
    
        rate_0.text(popularMovies[val_0].rating);
        rate_1.text(popularMovies[val_1].rating);
    
        name_0.text(popularMovies[val_0].name);
        name_1.text(popularMovies[val_1].name);
    
        class_1.attr("id", popularMovies[val_0].movie_id);
        class_2.attr("id", popularMovies[val_1].movie_id);
    
        circle_1.attr("id", popularMovies[val_0].movie_id);
        circle_2.attr("id", popularMovies[val_1].movie_id);
    
        info_1.attr("id", popularMovies[val_0].movie_id);
        info_2.attr("id", popularMovies[val_1].movie_id);
    
        $(".next_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
    
            var next_1 = val_0 + 2;
            var next_2 = val_1 + 2;
    
            if (next_2 <= popularMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
            }
            else {
                val_0 = 0;
                val_1 = 1;
            }
            // console.log(val_0, val_1)
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
    
        });
    
        $(".previous_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
    
            var previous_1 = val_0 - 2;
            var previous_2 = val_1 - 2;
    
            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
    
            }
            else {
                val_0 = 18;
                val_1 = 19;
            }
    
            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
    
            rate_0.text(popularMovies[val_0].rating);
            rate_1.text(popularMovies[val_1].rating);
    
            name_0.text(popularMovies[val_0].name);
            name_1.text(popularMovies[val_1].name);
    
            class_1.attr("id", popularMovies[val_0].movie_id);
            class_2.attr("id", popularMovies[val_1].movie_id);
    
            circle_1.attr("id", popularMovies[val_0].movie_id);
            circle_2.attr("id", popularMovies[val_1].movie_id);
    
            info_1.attr("id", popularMovies[val_0].movie_id);
            info_2.attr("id", popularMovies[val_1].movie_id);
    
        });
    };





    this.displayTopRatedMoviesBox4 = async () => {
        var topRatedMovies = await this.business.getResolvedTopRatedMovies();
        var imgHolder0 = $(".top_img_container_0_box4");
        var imgHolder1 = $(".top_img_container_1_box4");
        var imgHolder2 = $(".top_img_container_2_box4");
        var imgHolder3 = $(".top_img_container_3_box4");

        var rate_0 = $(".top_rate_0_box4");
        var rate_1 = $(".top_rate_1_box4");
        var rate_2 = $(".top_rate_2_box4");
        var rate_3 = $(".top_rate_3_box4");

        var name_0 = $(".top_name_0_box4");
        var name_1 = $(".top_name_1_box4");
        var name_2 = $(".top_name_2_box4");
        var name_3 = $(".top_name_3_box4");

        var class_1 = $(".top_button_1_box4");
        var class_2 = $(".top_button_2_box4");
        var class_3 = $(".top_button_3_box4");
        var class_4 = $(".top_button_4_box4");

        var circle_1 = $(".top_circle_1_box4");
        var circle_2 = $(".top_circle_2_box4");
        var circle_3 = $(".top_circle_3_box4");
        var circle_4 = $(".top_circle_4_box4");

        var info_1 = $(".top_info_1_box4");
        var info_2 = $(".top_info_2_box4");
        var info_3 = $(".top_info_3_box4");
        var info_4 = $(".top_info_4_box4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")");

        rate_0.text(topRatedMovies[val_0].rating);
        rate_1.text(topRatedMovies[val_1].rating);
        rate_2.text(topRatedMovies[val_2].rating);
        rate_3.text(topRatedMovies[val_3].rating);

        name_0.text(topRatedMovies[val_0].name);
        name_1.text(topRatedMovies[val_1].name);
        name_2.text(topRatedMovies[val_2].name);
        name_3.text(topRatedMovies[val_3].name);

        class_1.attr("id", topRatedMovies[val_0].movie_id);
        class_2.attr("id", topRatedMovies[val_1].movie_id);
        class_3.attr("id", topRatedMovies[val_2].movie_id);
        class_4.attr("id", topRatedMovies[val_3].movie_id);


        circle_1.attr("id", topRatedMovies[val_0].movie_id);
        circle_2.attr("id", topRatedMovies[val_1].movie_id);
        circle_3.attr("id", topRatedMovies[val_2].movie_id);
        circle_4.attr("id", topRatedMovies[val_3].movie_id);

        info_1.attr("id", topRatedMovies[val_0].movie_id);
        info_2.attr("id", topRatedMovies[val_1].movie_id);
        info_3.attr("id", topRatedMovies[val_2].movie_id);
        info_4.attr("id", topRatedMovies[val_3].movie_id);

        $(".next_row_1_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var next_1 = val_0 + 4;
            var next_2 = val_1 + 4;
            var next_3 = val_2 + 4;
            var next_4 = val_3 + 4;

            if (next_4 <= topRatedMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);
            rate_3.text(topRatedMovies[val_3].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);
            name_3.text(topRatedMovies[val_3].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);
            class_4.attr("id", topRatedMovies[val_3].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);
            circle_4.attr("id", topRatedMovies[val_3].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);
            info_4.attr("id", topRatedMovies[val_3].movie_id);

        });

        $(".previous_row_1_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var previous_1 = val_0 - 4;
            var previous_2 = val_1 - 4;
            var previous_3 = val_2 - 4;
            var previous_4 = val_3 - 4;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
            }
            else {
                val_0 = 16;
                val_1 = 17;
                val_2 = 18;
                val_3 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);
            rate_3.text(topRatedMovies[val_3].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);
            name_3.text(topRatedMovies[val_3].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);
            class_4.attr("id", topRatedMovies[val_3].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);
            circle_4.attr("id", topRatedMovies[val_3].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);
            info_4.attr("id", topRatedMovies[val_3].movie_id);

        });
    };


    this.displayTopRatedMoviesBox3 = async () => {
        var topRatedMovies = await this.business.getResolvedTopRatedMovies();
        var imgHolder0 = $(".top_img_container_0_box3");
        var imgHolder1 = $(".top_img_container_1_box3");
        var imgHolder2 = $(".top_img_container_2_box3");

        var rate_0 = $(".top_rate_0_box3");
        var rate_1 = $(".top_rate_1_box3");
        var rate_2 = $(".top_rate_2_box3");

        var name_0 = $(".top_name_0_box3");
        var name_1 = $(".top_name_1_box3");
        var name_2 = $(".top_name_2_box3");

        var class_1 = $(".top_button_1_box3");
        var class_2 = $(".top_button_2_box3");
        var class_3 = $(".top_button_3_box3");

        var circle_1 = $(".top_circle_1_box3");
        var circle_2 = $(".top_circle_2_box3");
        var circle_3 = $(".top_circle_3_box3");

        var info_1 = $(".top_info_1_box3");
        var info_2 = $(".top_info_2_box3");
        var info_3 = $(".top_info_3_box3");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")");

        rate_0.text(topRatedMovies[val_0].rating);
        rate_1.text(topRatedMovies[val_1].rating);
        rate_2.text(topRatedMovies[val_2].rating);

        name_0.text(topRatedMovies[val_0].name);
        name_1.text(topRatedMovies[val_1].name);
        name_2.text(topRatedMovies[val_2].name);

        class_1.attr("id", topRatedMovies[val_0].movie_id);
        class_2.attr("id", topRatedMovies[val_1].movie_id);
        class_3.attr("id", topRatedMovies[val_2].movie_id);

        circle_1.attr("id", topRatedMovies[val_0].movie_id);
        circle_2.attr("id", topRatedMovies[val_1].movie_id);
        circle_3.attr("id", topRatedMovies[val_2].movie_id);

        info_1.attr("id", topRatedMovies[val_0].movie_id);
        info_2.attr("id", topRatedMovies[val_1].movie_id);
        info_3.attr("id", topRatedMovies[val_2].movie_id);

        $(".next_row_1_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var next_1 = val_0 + 3;
            var next_2 = val_1 + 3;
            var next_3 = val_2 + 3;

            if (next_3 < topRatedMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);

        });

        $(".previous_row_1_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var previous_1 = val_0 - 3;
            var previous_2 = val_1 - 3;
            var previous_3 = val_2 - 3;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
            }
            else {
                val_0 = 17;
                val_1 = 18;
                val_2 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);
            rate_2.text(topRatedMovies[val_2].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);
            name_2.text(topRatedMovies[val_2].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);
            class_3.attr("id", topRatedMovies[val_2].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);
            circle_3.attr("id", topRatedMovies[val_2].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);
            info_3.attr("id", topRatedMovies[val_2].movie_id);

        });
    };


    this.displayTopRatedMoviesBox2 = async () => {
        var topRatedMovies = await this.business.getResolvedTopRatedMovies();
        var imgHolder0 = $(".top_img_container_0_box2");
        var imgHolder1 = $(".top_img_container_1_box2");

        var rate_0 = $(".top_rate_0_box2");
        var rate_1 = $(".top_rate_1_box2");

        var name_0 = $(".top_name_0_box2");
        var name_1 = $(".top_name_1_box2");

        var class_1 = $(".top_button_1_box2");
        var class_2 = $(".top_button_2_box2");

        var circle_1 = $(".top_circle_1_box2");
        var circle_2 = $(".top_circle_2_box2");

        var info_1 = $(".top_info_1_box2");
        var info_2 = $(".top_info_2_box2");

        val_0 = 0;
        val_1 = 1;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")");

        rate_0.text(topRatedMovies[val_0].rating);
        rate_1.text(topRatedMovies[val_1].rating);

        name_0.text(topRatedMovies[val_0].name);
        name_1.text(topRatedMovies[val_1].name);

        class_1.attr("id", topRatedMovies[val_0].movie_id);
        class_2.attr("id", topRatedMovies[val_1].movie_id);

        circle_1.attr("id", topRatedMovies[val_0].movie_id);
        circle_2.attr("id", topRatedMovies[val_1].movie_id);

        info_1.attr("id", topRatedMovies[val_0].movie_id);
        info_2.attr("id", topRatedMovies[val_1].movie_id);

        $(".next_row_1_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var next_1 = val_0 + 2;
            var next_2 = val_1 + 2;


            if (next_2 <= topRatedMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
            }
            else {
                val_0 = 0;
                val_1 = 1;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);

        });

        $(".previous_row_1_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var previous_1 = val_0 - 2;
            var previous_2 = val_1 - 2;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
            }
            else {
                val_0 = 18;
                val_1 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRatedMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRatedMovies[val_0].rating);
            rate_1.text(topRatedMovies[val_1].rating);

            name_0.text(topRatedMovies[val_0].name);
            name_1.text(topRatedMovies[val_1].name);

            class_1.attr("id", topRatedMovies[val_0].movie_id);
            class_2.attr("id", topRatedMovies[val_1].movie_id);

            circle_1.attr("id", topRatedMovies[val_0].movie_id);
            circle_2.attr("id", topRatedMovies[val_1].movie_id);

            info_1.attr("id", topRatedMovies[val_0].movie_id);
            info_2.attr("id", topRatedMovies[val_1].movie_id);

        });
    };




    this.displayUpcomingMoviesBox4 = async () => {
        var upcomingMovies = await this.business.getResolvedUpcomingMovies();
        var imgHolder0 = $(".up_img_container_0_box4");
        var imgHolder1 = $(".up_img_container_1_box4");
        var imgHolder2 = $(".up_img_container_2_box4");
        var imgHolder3 = $(".up_img_container_3_box4");

        var rate_0 = $(".up_rate_0_box4");
        var rate_1 = $(".up_rate_1_box4");
        var rate_2 = $(".up_rate_2_box4");
        var rate_3 = $(".up_rate_3_box4");

        var name_0 = $(".up_name_0_box4");
        var name_1 = $(".up_name_1_box4");
        var name_2 = $(".up_name_2_box4");
        var name_3 = $(".up_name_3_box4");

        var class_1 = $(".up_button_1_box4");
        var class_2 = $(".up_button_2_box4");
        var class_3 = $(".up_button_3_box4");
        var class_4 = $(".up_button_4_box4");

        var circle_1 = $(".up_circle_1_box4");
        var circle_2 = $(".up_circle_2_box4");
        var circle_3 = $(".up_circle_3_box4");
        var circle_4 = $(".up_circle_4_box4");

        var info_1 = $(".up_info_1_box4");
        var info_2 = $(".up_info_2_box4");
        var info_3 = $(".up_info_3_box4");
        var info_4 = $(".up_info_4_box4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")");

        rate_0.text(upcomingMovies[val_0].rating);
        rate_1.text(upcomingMovies[val_1].rating);
        rate_2.text(upcomingMovies[val_2].rating);
        rate_3.text(upcomingMovies[val_3].rating);

        name_0.text(upcomingMovies[val_0].name);
        name_1.text(upcomingMovies[val_1].name);
        name_2.text(upcomingMovies[val_2].name);
        name_3.text(upcomingMovies[val_3].name);

        class_1.attr("id", upcomingMovies[val_0].movie_id);
        class_2.attr("id", upcomingMovies[val_1].movie_id);
        class_3.attr("id", upcomingMovies[val_2].movie_id);
        class_4.attr("id", upcomingMovies[val_3].movie_id);


        circle_1.attr("id", upcomingMovies[val_0].movie_id);
        circle_2.attr("id", upcomingMovies[val_1].movie_id);
        circle_3.attr("id", upcomingMovies[val_2].movie_id);
        circle_4.attr("id", upcomingMovies[val_3].movie_id);

        info_1.attr("id", upcomingMovies[val_0].movie_id);
        info_2.attr("id", upcomingMovies[val_1].movie_id);
        info_3.attr("id", upcomingMovies[val_2].movie_id);
        info_4.attr("id", upcomingMovies[val_3].movie_id);

        $(".next_row_2_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var next_1 = val_0 + 4;
            var next_2 = val_1 + 4;
            var next_3 = val_2 + 4;
            var next_4 = val_3 + 4;

            if (next_4 <= upcomingMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);
            rate_3.text(upcomingMovies[val_3].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);
            name_3.text(upcomingMovies[val_3].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);
            class_4.attr("id", upcomingMovies[val_3].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);
            circle_4.attr("id", upcomingMovies[val_3].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);
            info_4.attr("id", upcomingMovies[val_3].movie_id);

        });

        $(".previous_row_2_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var previous_1 = val_0 - 4;
            var previous_2 = val_1 - 4;
            var previous_3 = val_2 - 4;
            var previous_4 = val_3 - 4;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
            }
            else {
                val_0 = 16;
                val_1 = 17;
                val_2 = 18;
                val_3 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);
            rate_3.text(upcomingMovies[val_3].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);
            name_3.text(upcomingMovies[val_3].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);
            class_4.attr("id", upcomingMovies[val_3].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);
            circle_4.attr("id", upcomingMovies[val_3].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);
            info_4.attr("id", upcomingMovies[val_3].movie_id);

        });
    };


    this.displayUpcomingMoviesBox3 = async () => {
        var upcomingMovies = await this.business.getResolvedUpcomingMovies();
        var imgHolder0 = $(".up_img_container_0_box3");
        var imgHolder1 = $(".up_img_container_1_box3");
        var imgHolder2 = $(".up_img_container_2_box3");

        var rate_0 = $(".up_rate_0_box3");
        var rate_1 = $(".up_rate_1_box3");
        var rate_2 = $(".up_rate_2_box3");

        var name_0 = $(".up_name_0_box3");
        var name_1 = $(".up_name_1_box3");
        var name_2 = $(".up_name_2_box3");

        var class_1 = $(".up_button_1_box3");
        var class_2 = $(".up_button_2_box3");
        var class_3 = $(".up_button_3_box3");

        var circle_1 = $(".up_circle_1_box3");
        var circle_2 = $(".up_circle_2_box3");
        var circle_3 = $(".up_circle_3_box3");

        var info_1 = $(".up_info_1_box3");
        var info_2 = $(".up_info_2_box3");
        var info_3 = $(".up_info_3_box3");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")");

        rate_0.text(upcomingMovies[val_0].rating);
        rate_1.text(upcomingMovies[val_1].rating);
        rate_2.text(upcomingMovies[val_2].rating);

        name_0.text(upcomingMovies[val_0].name);
        name_1.text(upcomingMovies[val_1].name);
        name_2.text(upcomingMovies[val_2].name);

        class_1.attr("id", upcomingMovies[val_0].movie_id);
        class_2.attr("id", upcomingMovies[val_1].movie_id);
        class_3.attr("id", upcomingMovies[val_2].movie_id);


        circle_1.attr("id", upcomingMovies[val_0].movie_id);
        circle_2.attr("id", upcomingMovies[val_1].movie_id);
        circle_3.attr("id", upcomingMovies[val_2].movie_id);

        info_1.attr("id", upcomingMovies[val_0].movie_id);
        info_2.attr("id", upcomingMovies[val_1].movie_id);
        info_3.attr("id", upcomingMovies[val_2].movie_id);

        $(".next_row_2_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var next_1 = val_0 + 3;
            var next_2 = val_1 + 3;
            var next_3 = val_2 + 3;

            if (next_3 < upcomingMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);

        });

        $(".previous_row_2_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var previous_1 = val_0 - 3;
            var previous_2 = val_1 - 3;
            var previous_3 = val_2 - 3;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
            }
            else {
                val_0 = 17;
                val_1 = 18;
                val_2 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);
            rate_2.text(upcomingMovies[val_2].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);
            name_2.text(upcomingMovies[val_2].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);
            class_3.attr("id", upcomingMovies[val_2].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);
            circle_3.attr("id", upcomingMovies[val_2].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);
            info_3.attr("id", upcomingMovies[val_2].movie_id);

        });
    };


    this.displayUpcomingMoviesBox2 = async () => {
        var upcomingMovies = await this.business.getResolvedUpcomingMovies();
        var imgHolder0 = $(".up_img_container_0_box2");
        var imgHolder1 = $(".up_img_container_1_box2");

        var rate_0 = $(".up_rate_0_box2");
        var rate_1 = $(".up_rate_1_box2");

        var name_0 = $(".up_name_0_box2");
        var name_1 = $(".up_name_1_box2");

        var class_1 = $(".up_button_1_box2");
        var class_2 = $(".up_button_2_box2");

        var circle_1 = $(".up_circle_1_box2");
        var circle_2 = $(".up_circle_2_box2");

        var info_1 = $(".up_info_1_box2");
        var info_2 = $(".up_info_2_box2");

        val_0 = 0;
        val_1 = 1;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")");

        rate_0.text(upcomingMovies[val_0].rating);
        rate_1.text(upcomingMovies[val_1].rating);;

        name_0.text(upcomingMovies[val_0].name);
        name_1.text(upcomingMovies[val_1].name);

        class_1.attr("id", upcomingMovies[val_0].movie_id);
        class_2.attr("id", upcomingMovies[val_1].movie_id);


        circle_1.attr("id", upcomingMovies[val_0].movie_id);
        circle_2.attr("id", upcomingMovies[val_1].movie_id);

        info_1.attr("id", upcomingMovies[val_0].movie_id);
        info_2.attr("id", upcomingMovies[val_1].movie_id);

        $(".next_row_2_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var next_1 = val_0 + 2;
            var next_2 = val_1 + 2;

            if (next_2 <= upcomingMovies.length) {
                val_0 = next_1;
                val_1 = next_2;
            }
            else {
                val_0 = 0;
                val_1 = 1;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);

        });

        $(".previous_row_2_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var previous_1 = val_0 - 2;
            var previous_2 = val_1 - 2;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
            }
            else {
                val_0 = 18;
                val_1 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + upcomingMovies[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(upcomingMovies[val_0].rating);
            rate_1.text(upcomingMovies[val_1].rating);

            name_0.text(upcomingMovies[val_0].name);
            name_1.text(upcomingMovies[val_1].name);

            class_1.attr("id", upcomingMovies[val_0].movie_id);
            class_2.attr("id", upcomingMovies[val_1].movie_id);

            circle_1.attr("id", upcomingMovies[val_0].movie_id);
            circle_2.attr("id", upcomingMovies[val_1].movie_id);

            info_1.attr("id", upcomingMovies[val_0].movie_id);
            info_2.attr("id", upcomingMovies[val_1].movie_id);

        });
    };



    this.displayPopularShowsBox4 = async (pageNum) => {
        var pageNum = 1;
        var popularShows = await this.business.getResolvedPopularTvShows(pageNum);

        var imgHolder0 = $(".pop_show_img0_box4");
        var imgHolder1 = $(".pop_show_img1_box4");
        var imgHolder2 = $(".pop_show_img2_box4");
        var imgHolder3 = $(".pop_show_img3_box4");

        var rate_0 = $(".pop_show_rate0_box4");
        var rate_1 = $(".pop_show_rate1_box4");
        var rate_2 = $(".pop_show_rate2_box4");
        var rate_3 = $(".pop_show_rate3_box4");

        var name_0 = $(".pop_show_name0_box4");
        var name_1 = $(".pop_show_name1_box4");
        var name_2 = $(".pop_show_name2_box4");
        var name_3 = $(".pop_show_name3_box4");

        var class_1 = $(".pop_show_id0_box4");
        var class_2 = $(".pop_show_id1_box4");
        var class_3 = $(".pop_show_id2_box4");
        var class_4 = $(".pop_show_id3_box4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")");

        rate_0.text(popularShows[val_0].rating);
        rate_1.text(popularShows[val_1].rating);
        rate_2.text(popularShows[val_2].rating);
        rate_3.text(popularShows[val_3].rating);

        name_0.text(popularShows[val_0].name);
        name_1.text(popularShows[val_1].name);
        name_2.text(popularShows[val_2].name);
        name_3.text(popularShows[val_3].name);

        class_1.attr("id", popularShows[val_0].show_id);
        class_2.attr("id", popularShows[val_1].show_id);
        class_3.attr("id", popularShows[val_2].show_id);
        class_4.attr("id", popularShows[val_3].show_id);

        $(".next_popular_show_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var next_1 = val_0 + 4;
            var next_2 = val_1 + 4;
            var next_3 = val_2 + 4;
            var next_4 = val_3 + 4;

            if (next_4 <= popularShows.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);
            rate_3.text(popularShows[val_3].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);
            name_3.text(popularShows[val_3].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);
            class_4.attr("id", popularShows[val_3].show_id);

        });

        $(".previous_popular_show_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var previous_1 = val_0 - 4;
            var previous_2 = val_1 - 4;
            var previous_3 = val_2 - 4;
            var previous_4 = val_3 - 4;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
            }
            else {
                val_0 = 16;
                val_1 = 17;
                val_2 = 18;
                val_3 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);
            rate_3.text(popularShows[val_3].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);
            name_3.text(popularShows[val_3].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);
            class_4.attr("id", popularShows[val_3].show_id);
        });
    };


    this.displayPopularShowsBox3 = async (pageNum) => {
        var pageNum = 1;
        var popularShows = await this.business.getResolvedPopularTvShows(pageNum);

        var imgHolder0 = $(".pop_show_img0_box3");
        var imgHolder1 = $(".pop_show_img1_box3");
        var imgHolder2 = $(".pop_show_img2_box3");

        var rate_0 = $(".pop_show_rate0_box3");
        var rate_1 = $(".pop_show_rate1_box3");
        var rate_2 = $(".pop_show_rate2_box3");

        var name_0 = $(".pop_show_name0_box3");
        var name_1 = $(".pop_show_name1_box3");
        var name_2 = $(".pop_show_name2_box3");

        var class_1 = $(".pop_show_id0_box3");
        var class_2 = $(".pop_show_id1_box3");
        var class_3 = $(".pop_show_id2_box3");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")");

        rate_0.text(popularShows[val_0].rating);
        rate_1.text(popularShows[val_1].rating);
        rate_2.text(popularShows[val_2].rating);

        name_0.text(popularShows[val_0].name);
        name_1.text(popularShows[val_1].name);
        name_2.text(popularShows[val_2].name);

        class_1.attr("id", popularShows[val_0].show_id);
        class_2.attr("id", popularShows[val_1].show_id);
        class_3.attr("id", popularShows[val_2].show_id);

        $(".next_popular_show_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var next_1 = val_0 + 3;
            var next_2 = val_1 + 3;
            var next_3 = val_2 + 3;

            if (next_3 < popularShows.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);

        });

        $(".previous_popular_show_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var previous_1 = val_0 - 3;
            var previous_2 = val_1 - 3;
            var previous_3 = val_2 - 3;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
            }
            else {
                val_0 = 17;
                val_1 = 18;
                val_2 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);
            rate_2.text(popularShows[val_2].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);
            name_2.text(popularShows[val_2].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
            class_3.attr("id", popularShows[val_2].show_id);
        });
    };


    this.displayPopularShowsBox2 = async (pageNum) => {
        var pageNum = 1;
        var popularShows = await this.business.getResolvedPopularTvShows(pageNum);

        var imgHolder0 = $(".pop_show_img0_box2");
        var imgHolder1 = $(".pop_show_img1_box2");

        var rate_0 = $(".pop_show_rate0_box2");
        var rate_1 = $(".pop_show_rate1_box2");

        var name_0 = $(".pop_show_name0_box2");
        var name_1 = $(".pop_show_name1_box2");

        var class_1 = $(".pop_show_id0_box2");
        var class_2 = $(".pop_show_id1_box2");

        val_0 = 0;
        val_1 = 1;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")");

        rate_0.text(popularShows[val_0].rating);
        rate_1.text(popularShows[val_1].rating);

        name_0.text(popularShows[val_0].name);
        name_1.text(popularShows[val_1].name);

        class_1.attr("id", popularShows[val_0].show_id);
        class_2.attr("id", popularShows[val_1].show_id);

        $(".next_popular_show_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var next_1 = val_0 + 2;
            var next_2 = val_1 + 2;

            if (next_2 <= popularShows.length) {
                val_0 = next_1;
                val_1 = next_2;
            }
            else {
                val_0 = 0;
                val_1 = 1;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);

        });

        $(".previous_popular_show_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var previous_1 = val_0 - 2;
            var previous_2 = val_1 - 2;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
            }
            else {
                val_0 = 18;
                val_1 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + popularShows[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(popularShows[val_0].rating);
            rate_1.text(popularShows[val_1].rating);

            name_0.text(popularShows[val_0].name);
            name_1.text(popularShows[val_1].name);

            class_1.attr("id", popularShows[val_0].show_id);
            class_2.attr("id", popularShows[val_1].show_id);
        });
    };


    this.displayTopRatedShowsBox4 = async (pageNum) => {
        var pageNum = 1;
        var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);

        var imgHolder0 = $(".top_show_img0_box4");
        var imgHolder1 = $(".top_show_img1_box4");
        var imgHolder2 = $(".top_show_img2_box4");
        var imgHolder3 = $(".top_show_img3_box4");

        var rate_0 = $(".top_show_rate0_box4");
        var rate_1 = $(".top_show_rate1_box4");
        var rate_2 = $(".top_show_rate2_box4");
        var rate_3 = $(".top_show_rate3_box4");

        var name_0 = $(".top_show_name0_box4");
        var name_1 = $(".top_show_name1_box4");
        var name_2 = $(".top_show_name2_box4");
        var name_3 = $(".top_show_name3_box4");

        var class_1 = $(".top_show_id0_box4");
        var class_2 = $(".top_show_id1_box4");
        var class_3 = $(".top_show_id2_box4");
        var class_4 = $(".top_show_id3_box4");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;
        val_3 = 3;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")");
        imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")");

        rate_0.text(topRated[val_0].rating);
        rate_1.text(topRated[val_1].rating);
        rate_2.text(topRated[val_2].rating);
        rate_3.text(topRated[val_3].rating);

        name_0.text(topRated[val_0].name);
        name_1.text(topRated[val_1].name);
        name_2.text(topRated[val_2].name);
        name_3.text(topRated[val_3].name);

        class_1.attr("id", topRated[val_0].show_id);
        class_2.attr("id", topRated[val_1].show_id);
        class_3.attr("id", topRated[val_2].show_id);
        class_4.attr("id", topRated[val_3].show_id);

        $(".next_top_rated_show_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var next_1 = val_0 + 4;
            var next_2 = val_1 + 4;
            var next_3 = val_2 + 4;
            var next_4 = val_3 + 4;

            if (next_4 <= topRated.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
                val_3 = next_4;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
                val_3 = 3;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);
            rate_3.text(topRated[val_3].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);
            name_3.text(topRated[val_3].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);
            class_4.attr("id", topRated[val_3].show_id);

        });

        $(".previous_top_rated_show_row_box4").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");
            imgHolder3.css("opacity", "0");

            var previous_1 = val_0 - 4;
            var previous_2 = val_1 - 4;
            var previous_3 = val_2 - 4;
            var previous_4 = val_3 - 4;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
                val_3 = previous_4;
            }
            else {
                val_0 = 16;
                val_1 = 17;
                val_2 = 18;
                val_3 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder3.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_3].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);
            rate_3.text(topRated[val_3].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);
            name_3.text(topRated[val_3].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);
            class_4.attr("id", topRated[val_3].show_id);
        });
    };


    this.displayTopRatedShowsBox3 = async (pageNum) => {
        var pageNum = 1;
        var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);

        var imgHolder0 = $(".top_show_img0_box3");
        var imgHolder1 = $(".top_show_img1_box3");
        var imgHolder2 = $(".top_show_img2_box3");

        var rate_0 = $(".top_show_rate0_box3");
        var rate_1 = $(".top_show_rate1_box3");
        var rate_2 = $(".top_show_rate2_box3");

        var name_0 = $(".top_show_name0_box3");
        var name_1 = $(".top_show_name1_box3");
        var name_2 = $(".top_show_name2_box3");

        var class_1 = $(".top_show_id0_box3");
        var class_2 = $(".top_show_id1_box3");
        var class_3 = $(".top_show_id2_box3");

        val_0 = 0;
        val_1 = 1;
        val_2 = 2;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")");
        imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")");

        rate_0.text(topRated[val_0].rating);
        rate_1.text(topRated[val_1].rating);
        rate_2.text(topRated[val_2].rating);

        name_0.text(topRated[val_0].name);
        name_1.text(topRated[val_1].name);
        name_2.text(topRated[val_2].name);

        class_1.attr("id", topRated[val_0].show_id);
        class_2.attr("id", topRated[val_1].show_id);
        class_3.attr("id", topRated[val_2].show_id);

        $(".next_top_rated_show_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var next_1 = val_0 + 3;
            var next_2 = val_1 + 3;
            var next_3 = val_2 + 3;

            if (next_3 < topRated.length) {
                val_0 = next_1;
                val_1 = next_2;
                val_2 = next_3;
            }
            else {
                val_0 = 0;
                val_1 = 1;
                val_2 = 2;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);

        });

        $(".previous_top_rated_show_row_box3").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");
            imgHolder2.css("opacity", "0");

            var previous_1 = val_0 - 3;
            var previous_2 = val_1 - 3;
            var previous_3 = val_2 - 3;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
                val_2 = previous_3;
            }
            else {
                val_0 = 17;
                val_1 = 18;
                val_2 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder2.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_2].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);
            rate_2.text(topRated[val_2].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);
            name_2.text(topRated[val_2].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
            class_3.attr("id", topRated[val_2].show_id);
        });
    };


    this.displayTopRatedShowsBox2 = async (pageNum) => {
        var pageNum = 1;
        var topRated = await this.business.getResolvedTopRatedTvShows(pageNum);

        var imgHolder0 = $(".top_show_img0_box2");
        var imgHolder1 = $(".top_show_img1_box2");

        var rate_0 = $(".top_show_rate0_box2");
        var rate_1 = $(".top_show_rate1_box2");

        var name_0 = $(".top_show_name0_box2");
        var name_1 = $(".top_show_name1_box2");

        var class_1 = $(".top_show_id0_box2");
        var class_2 = $(".top_show_id1_box2");

        val_0 = 0;
        val_1 = 1;

        imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")");
        imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")");

        rate_0.text(topRated[val_0].rating);
        rate_1.text(topRated[val_1].rating);

        name_0.text(topRated[val_0].name);
        name_1.text(topRated[val_1].name);

        class_1.attr("id", topRated[val_0].show_id);
        class_2.attr("id", topRated[val_1].show_id);

        $(".next_top_rated_show_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var next_1 = val_0 + 2;
            var next_2 = val_1 + 2;

            if (next_2 <= topRated.length) {
                val_0 = next_1;
                val_1 = next_2;
            }
            else {
                val_0 = 0;
                val_1 = 1;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);

        });

        $(".previous_top_rated_show_row_box2").on("click", async event => {
            imgHolder0.css("opacity", "0");
            imgHolder1.css("opacity", "0");

            var previous_1 = val_0 - 2;
            var previous_2 = val_1 - 2;

            if (previous_1 >= 0) {
                val_0 = previous_1;
                val_1 = previous_2;
            }
            else {
                val_0 = 18;
                val_1 = 19;
            }

            imgHolder0.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_0].poster + ")").css("opacity", "1").css("transition", "0.4s");
            imgHolder1.css("background-image", "url(" + "https://image.tmdb.org/t/p/original" + topRated[val_1].poster + ")").css("opacity", "1").css("transition", "0.4s");

            rate_0.text(topRated[val_0].rating);
            rate_1.text(topRated[val_1].rating);

            name_0.text(topRated[val_0].name);
            name_1.text(topRated[val_1].name);

            class_1.attr("id", topRated[val_0].show_id);
            class_2.attr("id", topRated[val_1].show_id);
        });
    };
};

// Na kopcinjata stavame attr ID so Id-to od filmot pod koj sto e kopceto.
// Na klik na kopceto pravime povik do api kade sto go vleceme filmot
//  so Id ist kako i ID-to od kopceto.  

//  Movie details go stavame na popup.
// popular i ostanati vo poseben html page. sekoja posebna kategorija
// searchot ili na poseben html ako funkcionira se najnormalno ili na popup.
// menito full screen popup 


// menito so gold underline pod kategorii





