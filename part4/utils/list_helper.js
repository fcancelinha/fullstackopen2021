const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {

    return blogs.length ? blogs.reduce((x, y) => x + y.likes, 0) : 0
}

const favouriteBlog = (blogs) => {

    if (blogs && blogs.length) {
        const { _id, __v, url, ...obj } = blogs.sort((a, b) => b.likes - a.likes)[0]
        return obj
    }

}

const mostBlogs = (blogs) => {

    const fav = blogs.reduce((author, blog) => {
        author[blog.author] = (author[blog.author] || 0) + 1;
        return author
    }, {})

    return Object.entries(fav).map(([author, blogs]) => ({ author, blogs })).sort((a, b) => b.blogs - a.blogs)[0]

}

const mostLikes = (blogs) => {

    if (blogs && blogs.length) {
        const { _id, __v, url, ...obj } = blogs.sort((a, b) => b.likes - a.likes)[0]
        return obj
    }
}



module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}