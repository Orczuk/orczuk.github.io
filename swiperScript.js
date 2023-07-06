var myApp = new Framework7();

var swiperConfigs = [
    {
        selector: '.swiper-1',
        par: '.swiper-pagination-1',
        next: '.swiper-button-next-1',
        prev: '.swiper-button-prev-1',
        slidesPerView: 3,
        spaceBetween: 30
    },
    {
        selector: '.swiper-2',
        par: '.swiper-pagination-2',
        next: '.swiper-button-next-2',
        prev: '.swiper-button-prev-2',
        slidesPerView: 3,
        spaceBetween: 30
    },
    {
        selector: '.swiper-3',
        par: '.swiper-pagination-3',
        next: '.swiper-button-next-3',
        prev: '.swiper-button-prev-3',
        slidesPerView: 3,
        spaceBetween: 30
    },
    {
        selector: '.swiper-4',
        par: '.swiper-pagination-4',
        next: '.swiper-button-next-4',
        prev: '.swiper-button-prev-4',
        slidesPerView: 3,
        spaceBetween: 30
    },
    {
        selector: '.swiper-5',
        par: '.swiper-pagination-5',
        next: '.swiper-button-next-5',
        prev: '.swiper-button-prev-5',
        slidesPerView: 3,
        spaceBetween: 30
    },
    {
        selector: '.swiper-6',
        par: '.swiper-pagination-6',
        next: '.swiper-button-next-6',
        prev: '.swiper-button-prev-6',
        slidesPerView: 3,
        spaceBetween: 30
    }
];

var i = -1;
// Goes through all of the swipers 
swiperConfigs.forEach(function(config) {
    var cards = 1;
    // Function to handle different logic based on the device
    if (isMobileDevice()) {
        cards = 1;
    } else {
        cards = 3.25;
    }
    
    var swiper = myApp.swiper(config.selector, {
        pagination: config.par,
        paginationClickable: true,
        navigation: {
            nextEl: config.next,
            prevEl:  config.prev
        },
        spaceBetween: config.spaceBetween,
        slidesPerView: cards,
        direction: config.direction || 'horizontal',
        speed: config.speed || 300,
        loop: true,
        loopAdditionalSlides: 30,
        centeredSlides: true
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
                        "                  </button>\n" +
                        "                  </form>\n" +
                        "                </div>\n" +
                        "              </div>");
                }
                // The Game is Full Price 
                else if (initialPrice === null || initialPrice === "" || data[j].is_free){
                    var price = "";
                    if(data[j].is_free){
                        price = "FREE";
                    }
                    else{
                      price = data[j].final;  
                    }
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
                        "                        <span class=\"new-price\">" + price + "</span>\n" +
                        "                      </span>\n" +
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

    swiper.slideNext();
});

// Function to check if user is on a mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
