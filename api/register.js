const register = (email, password, name, phone) => {
    return (
        fetch('https://chovieclam.net/api/register.php',
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