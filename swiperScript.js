var myApp = new Framework7();

var swiperConfigs = [
    {
        selector: '.swiper-1',
        slidesPerView: 4.5,
        spaceBetween: 30
    },
    {
        selector: '.swiper-2',
        slidesPerView: 4.5,
        spaceBetween: 30
    },
    {
        selector: '.swiper-3',
        slidesPerView: 4.5,
        spaceBetween: 30
    },
    {
        selector: '.swiper-4',
        slidesPerView: 4.5,
        spaceBetween: 30
    },
    {
        selector: '.swiper-5',
        slidesPerView: 4.5,
        spaceBetween: 30
    },
    {
        selector: '.swiper-6',
        slidesPerView: 4.5,
        spaceBetween: 30
    }
];

var i = -1;
// Goes through all of the swipers 
swiperConfigs.forEach(function(config) {
    var swiper = myApp.swiper(config.selector, {
        pagination: config.selector + ' .swiper-pagination',
        spaceBetween: config.spaceBetween,
        slidesPerView: config.slidesPerView,
        direction: config.direction || 'horizontal',
        speed: config.speed || 300,
        loop: true,
        loopAdditionalSlides: 30,
    });

    // Pulls the data 
    fetch('data.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            i++;
            //Creates 5 cards for the given swiper 
            for(var j = i*5; j < i*5+5; j++){
                
                // GetData For Checks  
                var initialPrice= data[j].initial;
                var gameDate = data[j].date;
                var parsedGivenDate = new Date(gameDate.replace(/(\d{2})(?:st|nd|rd|th)/, "$1"));
                var currentDate = new Date();
                
                // The Game is Still Coming Out
                if(currentDate < parsedGivenDate){
                    swiper.appendSlide("<div class=\"swiper-slide\"  style=\"background: linear-gradient(to bottom, #247aa1, #171a21 50%)\">\n" +
                        "                <div class=\"image\"  style=\"background: linear-gradient(to bottom, #247aa1, #171a21 50%)\">\n" +
                        "                  <img src=\"" + data[j].image + "\" alt=\"\" />\n" +
                        "                </div>\n" +
                        "                <div class=\"description\">\n" +
                        "                  <span class=\"desc\">" + data[j].desc + "</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"button\">\n" +
                        "                  <form action=\"" + data[j].link + "\" method=\"get\" target=\"_blank\">\n" +
                        "                  <button class=\"linkToSteam\">\n" +
                        "                      <span class=\"price\">\n" +
                        "                        <span class=\"new-price\">" + data[j].date + "</span>\n" +
                        "                      </span>\n" +
                        "                    <img src=\"images/steamBadge.png\" alt=\"Button Image\">\n" +
                        "                  </button>\n" +
                        "                  </form>\n" +
                        "                </div>\n" +
                        "              </div>");
                }
                // The Game is Full Price 
                    
                else if (initialPrice === null || initialPrice === "") {
                    swiper.appendSlide("<div class=\"swiper-slide\"  style=\"background: linear-gradient(to bottom, #4e5c6b, #171a21 50%)\">\n" +
                        "                <div class=\"image\"  style=\"background: linear-gradient(to bottom, #4e5c6b, #171a21 50%)\">\n" +
                        "                  <img src=\"" + data[j].image + "\" alt=\"\" />\n" +
                        "                </div>\n" +
                        "                <div class=\"description\">\n" +
                        "                  <span class=\"desc\">" + data[j].desc + "</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"button\">\n" +
                        "                  <form action=\"" + data[j].link + "\" method=\"get\" target=\"_blank\">\n" +
                        "                  <button class=\"linkToSteam\">\n" +
                        "                      <span class=\"price\">\n" +
                        "                        <span class=\"new-price\">" + data[j].final + "</span>\n" +
                        "                      </span>\n" +
                        "                    <img src=\"images/steamBadge.png\" alt=\"Button Image\">\n" +
                        "                  </button>\n" +
                        "                  </form>\n" +
                        "                </div>\n" +
                        "              </div>");
                }
                //The Game is On Sale 
                    
                else {
                    swiper.appendSlide("<div class=\"swiper-slide\"  style=\"background: linear-gradient(to bottom, #4c6b22, #171a21 50%)\">\n" +
                        "                <div class=\"image\"  style=\"background: linear-gradient(to bottom, #4c6b22, #171a21 50%)\">\n" +
                        "                  <img src=\"" + data[j].image + "\" alt=\"\" />\n" +
                        "                </div>\n" +
                        "                <div class=\"description\">\n" +
                        "                  <span class=\"desc\">" + data[j].desc + "</span>\n" +
                        "                </div>\n" +
                        "                \n" +
                        "                <div class=\"button\">\n" +
                        "                  <form action=\"" + data[j].link + "\" method=\"get\" target=\"_blank\">\n" +
                        "                  <button class=\"linkToSteam\">\n" +
                        "                      <span class=\"price\">\n" +
                        "                        <span class=\"old-price\">" + data[j].initial + "</span>\n" +
                        "                        <span class=\"new-price\">" + data[j].final + "</span>\n" +
                        "                      </span>\n" +
                        "                    <img src=\"images/steamBadge.png\" alt=\"Button Image\">\n" +
                        "                  </button>\n" +
                        "                  </form>\n" +
                        "                </div>\n" +
                        "              </div>");
                }
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});

