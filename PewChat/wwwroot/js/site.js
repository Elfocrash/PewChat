$(document).ready(function() {
    var connection = new WebSocketManager.Connection("ws://localhost:5000/chat");
    connection.enableLogging = true;

    connection.connectionMethods.onConnected = () => {

    }

    connection.connectionMethods.onDisconnected = () => {

    }

    connection.clientMethods["pingMessage"] = (socketId, message) => {
        var messageText = socketId + ' said: ' + message;
        $('#messages').append('<li>' + messageText + '</li>');
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

    connection.start();

    var $messagecontent = $('#message-content');
    $messagecontent.keyup(function(e) {
        if (e.keyCode == 13) {
            var message = $messagecontent.val().trim();
            if (message.length == 0) {
                return false;
            }
            connection.invoke("SendMessage", connection.connectionId, message);
            $messagecontent.val('');
        }
    });
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
});