"use strict";
$(document).ready(function() {

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        AOS Animation Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    AOS.init();
    window.addEventListener("load", AOS.refresh);
    AOS.init({
        once: true
    });
});
	$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

});

$('.set-bg').each(function () {
	var bg = $(this).data('setbg');
	$(this).css('background-image', 'url(' + bg + ')');
});
// protofile item filter
const filterContainer = document.querySelector('.protofolio-filter'),
filterBtns = filterContainer.children,
totalFilterBtn = filterBtns.length,
protofolioItems = document.querySelectorAll(".portfolio-item"),
// console.log(protofolioItems);
totalProtofolioItems = protofolioItems.length;
// console.log(totalProtofolioItems);

// console.log(totalFilterBtn);
for (let i = 0; i < totalFilterBtn; i++) {
 filterBtns[i].addEventListener("click", function() {
     filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");  

    const filterValue = this.getAttribute("data-filter");
    // console.log(filterValue);
    for (let j = 0; j < totalProtofolioItems; j++) {
        if (filterValue === protofolioItems[j].getAttribute("data-catogry")) {
            protofolioItems[j].classList.remove("hide");
            protofolioItems[j].classList.add("show");
            
        }
        else{
            protofolioItems[j].classList.remove("show");
            protofolioItems[j].classList.add("hide");
        }
        if (filterValue === "all") {
            protofolioItems[j].classList.remove("hide");
            protofolioItems[j].classList.add("show");
        }
    }

 })
    
}

// Protofile light box
const lightbox = document.querySelector(".lightbox"),
lightboxImg = lightbox.querySelector(".lightbox-img"),
closeLightbox = lightbox.querySelector(".lightbox-close"),
lightboxText = lightbox.querySelector(".capion-text"),
lightboxCounter = lightbox.querySelector(".capion-counter");
let itemIndex = 0;
for (let i = 0; i < totalProtofolioItems; i++) {
  protofolioItems[i].addEventListener("click",function() {
    itemIndex=i;
    changeItem();
    toggleLightbox();

  })
    
}
function nextItem() {
    if (itemIndex === totalProtofolioItems-1) {
        itemIndex = 0;
    }else{
        itemIndex++;
    }
    changeItem();
}
function prevItem() {
    if (itemIndex === 0) {
      itemIndex = totalProtofolioItems-1;
    }else{
        itemIndex--;
    }
    changeItem();
}
function toggleLightbox(){
    lightbox.classList.toggle("open");

    
}
function changeItem() {
    imgSrc = protofolioItems[itemIndex].querySelector(".protofile-img img").getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = protofolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex+1 )+ " of " + totalProtofolioItems ;
    
}
// close lightbox
lightbox.addEventListener("click" , function(event) {
    if (event.target === closeLightbox ||event.target === lightbox ) {
        toggleLightbox();
        
    }
    

})