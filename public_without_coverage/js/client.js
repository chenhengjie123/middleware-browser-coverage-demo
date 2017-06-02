/*globals $, document */
$(function () {
    $('.item').wrapInner(function () {
        var link = $('<a/>');
        link.attr('href', '/authors/' + $(this).attr('id'));
        return link;
    });
});

// post window.__coverage__ to server every 2 seconds
setInterval(function() {
    $.ajax({
        url: "/coverage/client",
        type: "POST",
        data: JSON.stringify(window.__coverage__),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        success: function(data) {
            console.log("success!");
        }
    });
}, 2000);
