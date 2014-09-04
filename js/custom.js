/* fix vertical when not overflow call fullscreenFix() if .fullscreen content changes */

$(document).ready(function() {
    $('#designed,#thoughtfully').on('show.bs.modal', function(e) {
        var iframe = $(this).find('iframe');
        iframe.attr('src', iframe.attr('data-src'));
    });
    function fullscreenFix() {
        var h = $('body').height();
        // set .fullscreen height
        $(".content-b").each(function(i) {
            if ($(this).innerHeight() <= h) {
                $(this).closest(".fullscreen").addClass("not-overflow");
            }
        });
    }
    $(window).resize(_.throttle(fullscreenFix, 300));
    fullscreenFix();

    /* resize background images */
    function backgroundResize() {
        var windowH = $(window).height();
        $(".background").each(function(i) {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
          
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if (path.hasClass("parallax")) {
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH ;
            imgW = imgH * ratio;
            // fix when too large
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }
    $(window).resize(_.throttle(backgroundResize, 300));
    backgroundResize();

});

function browserScriptsLoaded() {
    var controller;
    if (Modernizr.touch) {
        var myScroll;
        $(document).ready(function() {
            // wrap for iscroll
            $("#content-wrapper")
                .addClass("scrollContainer")
                .wrapInner('<div class="scrollContent"></div>');

            // add iScroll
            myScroll = new IScroll('#content-wrapper', {
                scrollX: false,
                scrollY: true,
                scrollbars: true,
                useTransform: false,
                useTransition: false,
                probeType: 3
            });

            // update container on scroll
            myScroll.on("scroll", function() {
                controller.update();
            });

            // overwrite scroll position calculation to use child's offset instead of parents scrollTop();
            controller.scrollPos(function() {
                return -myScroll.y;
            });

            // refresh height, so all is included.
            setTimeout(function() {
                myScroll.refresh();
            }, 0);

            $("#content-wrapper").on("touchend", "a", function(e) {
                // a bit dirty workaround for links not working in iscroll for some reason...
                e.preventDefault();
                window.location.href = $(this).attr("href");
            });

            // manual set hight (so height 100% is available within scroll container)
            $(document).on("orientationchange", function() {
                $("section")
                    .css("min-height", $(window).height())
                    .parent(".scrollmagic-pin-spacer").css("min-height", $(window).height());
            });
            $(document).trigger("orientationchange"); // trigger to init
        });
        // init the controller
        controller = new ScrollMagic({
            container: "#content-wrapper",
            globalSceneOptions: {
                triggerHook: "onLeave"
            }
        });
    } else {
        // init the controller
        controller = new ScrollMagic({
            globalSceneOptions: {
                triggerHook: "onLeave"
            }
        });
    }

    // ani
    var pinani = new TimelineMax()
        // pin move down
        .add(TweenMax.to("#lux4", 0.1, {
            autoAlpha: 9
        }))
        .add(TweenMax.to("#lux2", 0.1, {
            autoAlpha: 0,
            autoAlpha: 0
        }))
        .add(TweenMax.to("#lux3", 0.1, {
            autoAlpha: 9,
            marginTop: "-46%"
        }))
        .add(TweenMax.to("#lux5", 0.1, {
            autoAlpha: 9
        }))
        .add(TweenMax.to("#wipe", 0.2, {
            width: "100%"
        }))
		   .add(TweenMax.from(".design-intro, #grid-line-1", 0.2, {
			autoAlpha: 0
		}))
			.add(TweenMax.to("#grid-line-1", 0.3, {
				marginTop: "-2.8%"
			}))
			.add(TweenMax.from("#grid-line-3", 0.4, {
				autoAlpha: 0
			}))
   
        .add(TweenMax.to("#slide", 1, {
            top: "0%",
            backgroundColor: "#FFFBF4",
            ease: Cubic.easeOut
        }))
		.add(TweenMax.to(".twn-1", 0.2, {
            autoAlpha: 1
        }))
       .add(TweenMax.to(".twn-2", 0.3, {
            autoAlpha: 1
        }))
		.add(TweenMax.to(".twn-3", 0.4, {
            autoAlpha: 1
        }))
        .add(TweenMax.to(".intro, .twn-1, .twn-2, .twn-3", 0.5, {
            autoAlpha: 0
        }))
		
        .add([
            TweenMax.to("#slide", 0.5, {
                backgroundColor: "#ff6600",
                color: "#000"
            }),
            TweenMax.to("#slide h3:last-child", 0.3, {
                color: "#000"
            })
        ])
      
       .add(TweenMax.to("#unpin", 0.5, {
            top: "20%",
			ease: Cubic.easeOut
        }))

		.add(TweenMax.to("#slide", 0.5, {
             backgroundColor: "#ffffff"
        }))
		.add(TweenMax.to(".logo", 0.5, {
            autoAlpha: 1
        }))	
    // pin
    new ScrollScene({
        triggerElement: "section#pin",
        duration: 4000

    })
    .setTween(pinani)
    .setPin("section#pin")
    .addTo(controller);
	
	var pinani = new TimelineMax()
    //line1

.add([
    TweenMax.to(".download-1, .download-r-1", 0.3, {
        marginTop: "-11.991px"
    }),
    TweenMax.to(".download-2, .download-r-2", 0.3, {
        marginTop: "-7.994px"
    }),
    TweenMax.to(".download-3, .download-r-3", 0.3, {
        marginTop: "-3.997px"
    }),
    TweenMax.to(".download-4, .download-r-4", 0.3, {
        marginTop: "-11.991px"
    }),
    TweenMax.from("#text-info", 0.3, {
        autoAlpha: 0
    }),
])



new ScrollScene({
    triggerElement: "section#brouchure",

    duration: 300
})

.setTween(pinani)
    .setPin("section#brouchure")
    .addTo(controller);
	
}
// ani

	
	
if ($(window).width() > 1024) {

    var promises = [];

    promises.push($.getScript('js/scroll/modernizr.custom.min.js'));
    promises.push($.getScript('js/scroll/TweenMax.min.js'));
    promises.push($.getScript('js/scroll/ScrollToPlugin.min.js'));
	  promises.push($.getScript('js/scroll/jquery.scrollmagic.min.js'));
    promises.push($.getScript('js/scroll/iscroll-probe.js'));

    $.when.apply($, promises).done(browserScriptsLoaded);
}