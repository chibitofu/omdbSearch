$(document).ready(function() {

//Mahalo to Sean Robertson for this code.//
$('.delete-button').click(function(e) {
  // e.preventDefault();

  var id = $(this).attr('id');
  if (confirm('Are you sure you want to delete favorite item?')) {
    $.ajax({
      url: '/favorites',
      method: 'DELETE',
      data: {id: id},
      success: function(data, status, obj) {
        alert('Deleted Favorite');
        // window.location = '/favorites';
        window.location.reload(true);
      },
      error: function(err, status, message) {
        console.log(err, status, message);
      }
    });
  } else {

    return;

  }
});


});
