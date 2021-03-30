const saveJob = (email, idJob) => {
    return (
        fetch('http://192.168.20.102:8080/WebService/saveJob.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, idJob })
            })
            .then(res => res.text())
    )
}

module.exports = saveJob