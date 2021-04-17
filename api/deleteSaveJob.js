const deleteSaveJob = (user, jobID) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/deleteSaveJob.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ user, jobID})
            })
            .then(res => res.text())
    )
}

module.exports = deleteSaveJob