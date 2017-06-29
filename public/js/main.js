$(document).ready(function(){
  $('#delete_tour').on('click', function(e){
    const elem = document.getElementById('delete_tour');
    const id = elem.getAttribute("data-id");
    $.ajax({
      type: 'DELETE',
      url: '/tour/'+id,
      success: function (res) {
        alert('Deleted Tour');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
