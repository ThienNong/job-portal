const addJob = (jobTitle, jobTypeID, address, provinceID, salary, expJob, jobDescription, jobRequirement, jobProvider) => {
    return (
        fetch('https://chovieclam.net/api/addJob.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ jobTitle, jobTypeID, address, provinceID, salary, expJob, jobDescription, jobRequirement, jobProvider })
            })
            .then(res => res.text())
    )
}

module.exports = addJob