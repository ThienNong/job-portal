const getSaveJob = (user) => {
    return (
        fetch('https://jobportalthiennong.000webhostapp.com/webservice/getSaveJob.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getSaveJob