/*globals $ */
function showDeceased(flag) {
    if (flag) {
        $('#deceased').css('display', '');
    }
}


// post window.__coverage__ to server
setTimeout(function() {
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
}, 5000);
