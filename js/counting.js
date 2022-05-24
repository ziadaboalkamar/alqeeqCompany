var counterTeaserL = $('.number_of_client');
var winHeight = $(window).height();
if (counterTeaserL.length) {
    var firEvent = false,
        objectPosTop = $('.number_of_client').offset().top;
        
        //when element shows at bottom
        var elementViewInBottom = objectPosTop - winHeight;
    $(window).on('scroll', function() {
        var currentPosition = $(document).scrollTop();
        //when element position starting in viewport
      if (currentPosition > elementViewInBottom && firEvent === false) {
        firEvent = true;
        animationCounter();
      }   
    });
}

//counter function will animate by using external js also add seprator "."
function animationCounter(){
$('.counting').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
  
    {
  
      duration: 3000,
      easing: 'swing',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
        // alert('finished');
      }
  
    });  
    
  
  });
}