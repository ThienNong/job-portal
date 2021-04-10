const saveJob = (email, idJob) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/saveJob.php',
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