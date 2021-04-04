const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    
    return blogs.length ? blogs.reduce((x, y) => x + y.likes, 0) : 0
}


module.exports = {
    dummy,
    totalLikes
}