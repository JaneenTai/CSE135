const form = document.getElementById('echo-form');

form.addEventListener('submit', async function (event) {
    event.preventDefault(); // stop the normal HTML form submission

    const method = document.getElementById('method').value;
    const queryString = document.getElementById('query').value;

    if(method == 'GET'){
        fetch('cgi-bin/perl-general-echo.pl')
        .then(response => response.text())
        .then(html => {
            document.getElementById('container').innerHTML = html;
        })
        .catch(error => console.error('Error fetching page:', error));
    }
    
});