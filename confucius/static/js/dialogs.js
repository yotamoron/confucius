function prepareSourcePopupForm() {

    
    
 
    $("#service-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 370,
      modal: true,
      buttons: {
        "Update component": function() {
            var title = $("#title");
            var elemId = $('#element-id').val();
            var elem = $('#' + elemId);
            elem.text(title.val());
            $(".dynamic_field").each(function(idx, value) {
              var param_name = $(value).attr('id');
              var value = $(value).val();
              saveModelValue(elemId, param_name, value);
            });

            $(this).dialog( "close" );
        },
        Cancel: function() {
            $(this).dialog( "close" );
        }
      },
      close: function() {
        var allFields = $([]).add(title);
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });
}

