function sendRequest() {
    const language = document.getElementById("language").value;
    const method = document.getElementById("method").value.toUpperCase();
    const encoding = document.getElementById("encoding").value;
    const message = document.getElementById("body-msg").value.trim();
    const extraText = document.getElementById("query").value.trim();

    if (message === "") {
        alert("Message field is required.");
        return;
    }

    const endpoints = {
        perl: "cgi-bin/perl-general-echo.pl",
        php: "cgi-bin/echo-php.php",
        node: "cgi-bin/echo-node.js",
        python: "cgi-bin/echo-python.py",
    };

    const url = endpoints[language];

    // always-valid query string, independent of body encoding
    const queryString =
        "message=" +
        encodeURIComponent(message) +
        (extraText !== "" ? "&extra-text=" + encodeURIComponent(extraText) : "");

    const options = { method };
    let requestUrl = url;

    if (method === "GET") {
        // GET: no body, no Content-Type header needed
        requestUrl += "?" + queryString;
    } else {
        // POST/PUT/DELETE: body shaped by the chosen encoding
        options.headers = { "Content-Type": encoding };
        options.body =
            encoding === "application/json"
                ? JSON.stringify({ message: message, "extra-text": extraText })
                : queryString;
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