const signIn = (email, password) => {
    return (
        fetch('http://192.168.20.102:8080/WebService/login.php',
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