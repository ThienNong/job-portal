const register = (email, password, name, phone) => {
    return (
        fetch('http://192.168.20.102:8080/WebService/register.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password, name, phone })
            })
            .then(res => res.text())
    )
}

module.exports = register