define(["jquery", "jqx-all"], function () {
    var initialize = function () {
        $(document).ready(function () {
            $('#jqxTree').jqxTree({ height: '300px', width: '300px' });
            $('#jqxTree').css("visibility", "visible");
        });
    };
    return {
        initialize: initialize
    };
});

