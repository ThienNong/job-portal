const deleteYourJob = (jobID) => {
    return (
        fetch('https://chovieclam.net/api/deleteYourJob.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({jobID})
            })
            .then(res => res.text())
    )
}

module.exports = deleteYourJob