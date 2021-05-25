const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const config = require('./config/config')
const logger = require('./utils/logger')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const mongoose = require('mongoose')

logger.info('connecting to MongoDB using', config.MONGODB_URI)
mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        logger.info('connection to mongoDB established... [OK]')
    })
    .catch((error) => {
        logger.error('connection to mongoDB failed... [ERROR] :', error.message)
    })


const JWT_SECRET = config.SECRET


const typeDefs = gql`

  type Author {
    id: ID!
    name: String!
    born: Int 
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {

    addBook (
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
        username: String!
        favoriteGenre: String!
    ): User

    login(
        username: String!
        password: String!
    ): Token
  }
`

const resolvers = {
    Query: {
        bookCount: (_, args) => args.author ? authorBookCount(args.author) : Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (_, args) => Book.find({}),
        allAuthors: (_, args) => args.author ? Author.find({}) : Author.find({ name: args.name }),
        me: (root, args, context) => context.currentUser,
    },

    Mutation: {

        addBook: async (_, args, { currentUser }) => {

            if(!currentUser){
                throw new AuthenticationError("not authenticated")
            }
            
            const authorExists = await Author.findOne({ name: args.author })

            if (authorExists) {
                args.author = authorExists._id.toString()
            }

            const newBook = new Book({ ...args })

            try {

                await newBook.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return await Book.findOne({ _id: newBook._id }).populate('author', { name: 1, born: 1 })
        },

        editAuthor: async (_, args, { currentUser }) => {
            
            if(!currentUser){
                throw new AuthenticationError("not authenticated")
            }

            const newAuthor = await Author.findOne({ name: args.name })

            if (newAuthor) {

                try {

                    return await Author.findByIdAndUpdate(newAuthor._id, { born: args.setBornTo }, { new: true, runValidators: true })

                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }

            return null
        },

        createUser: async (_, args) => {

            const user = new User({ username: args.username })

            try {
                return await user.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        login: async (_, args) => {

            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }

        },
    },

    Author: {
        bookCount: (root) => Author.where({name: root.name}).count()
    }
}



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {

        const auth = req ? req.headers.authorization : null

        if(auth && auth.toLowerCase().startWith('bearer ')) {
            const decodeToken = jwt.verify(
                auth.substring(7),
                JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})