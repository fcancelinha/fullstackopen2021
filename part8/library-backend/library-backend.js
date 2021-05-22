const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/**
 * defines the model of the Graphql Schema
 */
const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int 
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`

/**
 * defines the resolvers which define how Graphql queres are responded to
 */
const resolvers = {
  Query: {
      bookCount: (_, args) => args.author ? authorBookCount(args.author) : books.length,
      authorCount: () => authors.length,
      allBooks: (_, args) => {

      const {author, genre} = args
        
        if (author && genre) {
          return books.filter(book => book.author === author && book.genres.includes(genre))
        } else if (author) {
          return books.filter(book => book.author === author)
        } else if (genre) {
          return books.filter(book => book.genres.includes(genre))
        } else {
          return books;
        }
      },

      allAuthors: () => authors.map(author => author)
  },

  Mutation: {

    addBook: (_, args) => {

      const book = {...args, id: uuid(args.author)}
      
      if(!authors.some(author => author.name === book.author)){

        const author = {
          id: uuid(book.author),
          name: book.author,
          born: null, 
        }

        authors = authors.concat(author)
      }
    
      books = books.concat(book)
      return book
    },

    editAuthor: (_, args) => {

      const author = authors.find(authr => authr.name === args.name)

      if(author){

        const newAuthor = {
          ...author,
          born: args.setBornTo
        }

        authors = authors.map(author => author.id === newAuthor.id ? newAuthor : author )
      }

      return author
    }

  },

  Author: {
    bookCount: (root) => authorBookCount(root.name)
  }
}


const authorBookCount = (author) => {
  let counter = 0;
  books.forEach(book => book.author === author && counter++);
  return counter 
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})