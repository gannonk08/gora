$(document).ready(function () {
    console.log("FAARTS")
    $('select#week').on('change', (e) => {
      var optionSelected = $( "select#week option:selected" ).text();
      console.log(optionSelected);
  });
});

