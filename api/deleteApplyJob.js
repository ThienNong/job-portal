const deleteApplyJob = (user, jobID) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/deleteApplyJob.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ jobID, user})
            })
            .then(res => res.text())
    )
}

module.exports = deleteApplyJob