const setUserInfo = (name, sex, address, phone, currentJob, other) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/setUserInfo.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, sex, address, phone, currentJob, other })
            })
            .then(res => res.text())
    )
}

module.exports = setUserInfo