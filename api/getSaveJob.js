const getSaveJob = (user) => {
    return (
        fetch('https://chovieclam.net/api/getSaveJob.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getSaveJob