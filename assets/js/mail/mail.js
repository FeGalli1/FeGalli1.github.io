////////////  Form Submit /////////////
$(document).ready(function(){
  $("#contactForm").on("submit", function(event){
      event.preventDefault();
      let formData = $(this).serialize();
      let url = "https://formsubmit.co/ajax/felipegall1.fg@gmail.com";
      
      $.ajax({
          method: 'POST',
          url: url,
          dataType: 'json',
          accepts: 'application/json',
          data: formData,
          success: function (data) {
              // $("#message").html(`<h3 class='alert-msg bg-success p-3 mt-3'>Me pondré en contacto contigo lo antes posible.</h3>").slideDown("slow")`);
              $("#contactForm")[0].reset(); // Vacía el formulario después de enviar
              window.scrollTo(0, 0); // Vuelve al principio de la página
              setTimeout(function () {
                $("#contactForm")[0].reset(); // Vacía el formulario después de enviar

                  // $("#message").slideUp("slow");
              }, 3000);
          },
          error: function(response){
              alert("Error al enviar el formulario.");
              window.location.reload();
          }
      });
  });
});
