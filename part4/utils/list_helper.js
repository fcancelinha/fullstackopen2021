const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    
    return blogs.length ? blogs.reduce((x, y) => x + y.likes, 0) : 0
}

const favouriteBlog = (blogs) => {

    if(blogs && blogs.length){
        const {_id, __v, url, ...obj} = blogs.sort((a,b) => b.likes - a.likes)[0]
        return obj
    }

}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}