const checkLogin = (token) => {
    return (
        fetch('https://chovieclam.net/api/check_login.php',
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