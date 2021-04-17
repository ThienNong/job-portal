const getApplyJob = (user) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/getApplyJob.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getApplyJob