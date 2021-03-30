const getSaveJob = (user) => {
    return (
        fetch('http://192.168.20.102:8080/WebService/getSaveJob.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getSaveJob