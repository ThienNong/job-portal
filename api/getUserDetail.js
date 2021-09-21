const getUserDetail = (user) => {
    return (
        fetch('https://chovieclam.net/api/getUserDetail.php?user=' + user)
        .then(res => res.json())
    )
}

module.exports = getUserDetail