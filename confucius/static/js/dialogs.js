function prepareSourcePopupForm() {

    var title = $("#title");
    var allFields = $([]).add(title);
 
    $("#service-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Update component": function() {
            var elemId = $('#element-id').val();
            var elem = $('#' + elemId);
            elem.text(title.val());
            $(this).dialog( "close" );
        },
        Cancel: function() {
            $(this).dialog( "close" );
        }
      },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });
}

