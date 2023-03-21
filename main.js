let changeYearVideoTime = [];
let videoCoste;
let videoActivity;
let carouselCoste;
let carouselActivity;
let videoCosteEvents = [
  {time: 1, triggered: true, slide: 0},
  {time: 2.7, triggered: true, slide: 1},
  {time: 5, triggered: true, slide: 2},
  {time: 7, triggered: true, slide: 3},
  // { time: 6, triggered: false },
];

let videoActivityEvents = [
  {time: 1.3, triggered: true, slide: 0},
  {time: 2.6, triggered: true, slide: 1},
  {time: 4.2, triggered: true, slide: 2},
  {time: 5.8, triggered: true, slide: 3},
  {time: 7.1, triggered: true, slide: 4},
];

$(() => {
  videoCoste = $("#video-coste");
  videoActivity = $("#video-attivita");
  carouselCoste = $("#changing-year");
  carouselActivity = $("#changing-activity");

  $("#cards-container").slick({
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1000,
    arrows: false,
    initialSlide: 6,
    infinite: true,
    slidesToShow: 5,
    variableWidth: true,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  carouselCoste.slick({
    vertical: true,
    arrows: false,
    draggable: false,
    speed: 1000,
    //variableWidth: true,
  });

  carouselActivity.slick({
    vertical: true,
    arrows: false,
    draggable: false,
    speed: 200,
  });

  videoCoste.on("timeupdate", () => {
    videoEventsDispatcher(videoCoste, videoCosteEvents, "changeyear", carouselCoste);
  });

  videoActivity.on("timeupdate", () => {
    videoEventsDispatcher(videoActivity, videoActivityEvents, "changeactivity", carouselActivity);
  });

  function videoEventsDispatcher(video, events, eventName, carousel) {
    if (video[0].currentTime < 1 && events[0].triggered) {
      events.forEach((e) => {
        e.triggered = false;
      });
    }

    let trigger = events.find((i) => video[0].currentTime > i.time && !i.triggered);

    if (trigger) {
      //non la fa se undefined

      trigger.triggered = true;

      if (trigger.slide == carousel.slick("slickCurrentSlide")) {
        carousel.slick("slickNext");
      } else if (trigger.slide == events[events.length - 1].slide) {
        console.log("ociooooo");
        carousel.slick("slickGoTo", 0);
      } else {
        console.log("ocio");
        carousel.slick("slickGoTo", trigger.slide + 1);
      }

      // video[0].dispatchEvent(new CustomEvent(eventName));
    }
  }

  // videoCoste.on("changeyear", () => {
  //     carouselCoste.slick("slickNext");
  // });

  // videoActivity.on("changeactivity", () => {
  //   carouselActivity.slick("slickNext");
  // });

  $(window).resize(function () {
    carouselCoste[0].slick.refresh();
    carouselActivity[0].slick.refresh();
  });
});
