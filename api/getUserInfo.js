const getUserInfo = (user) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/getUserInfo.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ user })
            })
            .then(res => res.text())
    )
}

module.exports = getUserInfo