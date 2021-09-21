const getCandidate = (idJob) => {
    return (
        fetch('https://chovieclam.net/api/getCandidateJob.php?idJob=' + idJob)
        .then(res => res.json())
    )
}

module.exports = getCandidate