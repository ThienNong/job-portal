const getApplyJob = (user) => {
    return (
        fetch('https://chovieclam.net/api/getApplyJob.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getApplyJob