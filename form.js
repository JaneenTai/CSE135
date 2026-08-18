function sendRequest() {
    // save values from the form
    const language = document.getElementById("language").value;
    const method = document.getElementById("method").value.toUpperCase();
    const encoding = document.getElementById("encoding").value;
    const message = document.getElementById("message").value.trim();
    const extraText = document.getElementById("extra-text").value.trim();

    // check required field
    if (message === "") {
        alert("Message field is required.");
        return;
    }

    // keep track of the endpoints/code
    const endpoints = {
        perl: "cgi-bin/perl-general-echo.pl",
        php: "cgi-bin/echo-php.php",
        nodejs: "cgi-bin/echo-nodejs.js",
        python: "cgi-bin/echo-python.py",
    };

    const url = endpoints[language];

    // check encoding selected -> build request body from that
    let body;
    if (encoding === "application/json") {
        body = JSON.stringify({ message: message, "extra-text": extraText });
    } else {
        body =
            "message=" +
            encodeURIComponent(message) +
            (extraText !== "" ? "&extra-text=" + encodeURIComponent(extraText) : "");
    }

    const options = { method: method, headers: { "Content-Type": encoding } };
    let requestUrl = url;

    // If the method is GET, append the body as query parameters
    // Else if method is POST, PUT or DELETE, send the body in the request
    if (method === "GET") {
        requestUrl += "?" + body;
    } else {
        options.body = body;
    }

    fetch(requestUrl, options)
        .then((response) => response.text())
        .then((html) => {
            document.open();
            document.write(html);
            document.close();
        })
        .catch((err) => alert("Request failed: " + err));
}