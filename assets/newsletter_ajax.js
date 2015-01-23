function get_csrf_token(xhr){
  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
}

$(function() {
  $('form.subscribers-form').on("keyup keypress", function(e) {
    var code = e.keyCode || e.which;
    if (code  == 13) {
      $('#section__subscribe--layout-ajax .submit-newsletter').trigger("click")
      return false;
    }
  });

  $(document).on('click', '#section__subscribe--layout-ajax .submit-newsletter', function(event){
    var request = $.ajax({
      url: $('form.subscribers-form').attr('action'),
      type: "post",
      data: {subscriber: {email: $("#subscriberEmail").val()}},
      dataType: "json",
      beforeSend: function(xhr) {get_csrf_token(xhr);},
      statusCode: {
        200: function (data) {
          $('#section__subscribe--layout-ajax .subscribe__message').html(data.html);
        },
        400: function (data) {
          $('#section__subscribe--layout-ajax .subscribe__message').html(data.responseJSON.errors);
        }
      }
    });
  });
});
