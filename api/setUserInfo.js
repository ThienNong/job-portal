const setUserInfo = (user, name, sex, address, phone, currentJob, other) => {
    return (
        fetch('https://chovieclam.net/api/setUserInfo.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({user, name, sex, address, phone, currentJob, other })
            })
            .then(res => res.text())
    )
}

module.exports = setUserInfo