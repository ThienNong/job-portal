const signIn = (email, password) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(res => res.json())
    )
}

module.exports = signIn