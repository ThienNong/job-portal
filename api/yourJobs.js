const yourJobs = (jobProvider) => {
    return (
        fetch('https://chovieclam.net/api/yourJobs.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ jobProvider })
            })
            .then(res => res.json())
    )
}

module.exports = yourJobs