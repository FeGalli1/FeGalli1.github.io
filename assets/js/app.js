(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function () {
      Init.s();
      Init.methods();
    },
    s: function () {
      this._window = $(window);
      this._document = $(document);
      this._body = $("body");
      this._html = $("html");
    },
    methods: function () {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.initializeSlick();
      Init.hamburgerMenu();
      Init.formValidation();
      Init.contactForm();
    },
    w: function () {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "300");
      });
    },
    preloader: function () {
      setTimeout(function () { $('#preloader').hide('slow'); }, 2000);
    },
    initializeSlick: function () {
      if ($(".client-slider").length) {
        $(".client-slider").slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 2,
          arrows: false,
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 3000,
          responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 5 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } },
            { breakpoint: 767, settings: { slidesToShow: 3 } },
            { breakpoint: 575, settings: { slidesToShow: 2 } },
          ],
        });
      }
    },
    hamburgerMenu: function () {
      if ($(".hamburger-menu").length) {
        $('.hamburger-menu').on('click', function() {
          $('.bar').toggleClass('animate');
          $('.mobile-navar').toggleClass('active');
          return false;
        });
        $('.has-children').on('click', function(e) {
          e.stopPropagation(); 
          $(this).children('ul').slideToggle('slow', 'swing');
          $('.icon-arrow', this).toggleClass('open');
        });
        $('.menu-item').on('click', function() {
          if ($('.mobile-navar.active').length) {
            $('.bar').removeClass('animate');
            $('.mobile-navar').removeClass('active');
          }
        });
      }
    },
    formValidation: function () {
      if ($("#contactForm").length) {
        $("#contactForm").validate();
      }
    },
    contactForm: function () {
      $("#contactForm").on("submit", function (e) {
        e.preventDefault();
        if ($("#contactForm").valid()) {
          var _self = $(this);
          _self.closest("div").find('button[type="submit"]').attr("disabled", "disabled");

          let data = $(this).serialize();
          let url = "https://formsubmit.co/ajax/felipegall1.fg@gmail.com";
          $.ajax({
            method: 'POST',
            url: url,
            dataType: 'json',
            accepts: 'application/json',
            data: data,
            success: function (data) {
              $("#contactForm").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='alert-msg bg-success color-primary p-5 mt-5'>¡Gracias! <br> Me pondré en contacto lo antes posible</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='bg-danger text-black p-5 mt-5'>Hubo un error, intente nuevamente</h5>";
              }
              $("#message").show("slow").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide").hide("slow");
              }, 3000);
            },
            error: function() {
              alert("Error al enviar el formulario.");
              window.location.reload();
            }
          });
        } else {
          return false;
        }
      });
    }
  };
  Init.i();
})(window, document, jQuery);
