const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload
  input CategoryInput {
    name: String!
    image: String
  }
  type User {
    _id: ID
    usernameId: String
    password: String
    phoneNumber: String
    profilePhoto: String
    introduction: String
    followers: [User]
    following: [User]
    myProducts: [Product]
    myCart: [Product]
    notifications: [Notification]
    rooms: [Room]
    notification: Boolean
    directMessage: Boolean
    marketing: Boolean
    accessToken: String
    refreshToken: String
  }

  type Admin {
    _id: ID
    usernameId: String
    password: String
    accessToken: String
    refreshToken: String
  }

  type Product {
    _id: ID
    user: User
    images: [String]
    price: Int
    brand: String
    category: String
    condition: String
    size: String
    style: String
    description: String
    soldOut: Boolean
    createdAt: String
  }

  type Pagination {
    totalItem: Int
    offset: Int
    limit: Int
  }

  type ProdPagination {
    pagination: Pagination
    products: [Product]
  }

  type UserPagination {
    pagination: Pagination
    users: [User]
  }

  type ProductCategory {
    category: String
    productsCount: Int
    photo: [String]
  }

  type Notification {
    _id: ID
    user: User
    message: String
  }

  type File {
    uri: String
    filename: String
    mimetype: String
    encoding: String
  }

  type Message {
    _id: ID
    text: String
    receiver: User
    sender: User
    createdAt: String
  }

  type Room {
    _id: ID
    user: User
    other_user: User
    last_message: Message
    number_of_unread_messages: Int
    messages: [Message]
    createdAt: String
  }

  type Category {
    _id: ID
    name: String
    image: String
    sub_categories: [Category]
    productsCount: Int
    products: [Product]
  }
`;
