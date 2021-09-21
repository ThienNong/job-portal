const saveJob = (email, idJob) => {
    return (
        fetch('https://chovieclam.net/api/saveJob.php',
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