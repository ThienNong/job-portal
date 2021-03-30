const checkLogin = (token) => {
    return (
        fetch('http://192.168.20.102:8080/WebService/check_login.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ token })
            })
            .then(res => res.json())
    )
}

module.exports = checkLogin