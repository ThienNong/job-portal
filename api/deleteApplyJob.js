const deleteApplyJob = (user, jobID) => {
    return (
        fetch('https://chovieclam.net/api/deleteApplyJob.php',
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