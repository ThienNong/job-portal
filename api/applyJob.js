const applyJob = (email, idJob) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/applyJob.php',
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

module.exports = applyJob