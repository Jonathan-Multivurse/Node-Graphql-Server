const { gql } = require("apollo-server-express");
const types = require("./types");

const query = gql`
  type Query {
    ########### USER QUERIES ############
    #####################################
    ########## account queries ##########
    fetchUser: User
    fetchUsers: Int
    fetchUserdetails(offset: Int, limit: Int): UserPagination
    fetchUserById(_id: ID): User
    ########## follow queries ##########
    getFollowers: [User]
    getFollowing: [User]
    getMostRecentFollowing: [User]
    ########## product queries ##########
    getProduct: Product
    getProductById(_id: ID): Product
    getRecommendedProducts: [Product]
    getProducts: Int
    productDetails(offset: Int, limit: Int): ProdPagination
    getSold: Int
    getSoldProducts: Int
    getRoom(_id: ID): Room
    getRooms: [Room]
    fetchPopularUsers: [User]
    getPopularCategories: [Category]
    getAllProducts: [Product]
    getFeedProducts: [Product]
    getCategories: [Category]
    getCategoryById(_id: ID): Category
    searchProducts(searchText: String): [Product]
  }

  type Mutation {
    ########### USER MUTATIONS ##########
    #####################################
    ########## phone authentication mutations ########
    getPhoneAuthCode(
      name: String!
      phoneNumber: String!
      countryCode: String!
    ): Boolean
    confirmPhoneAuthCode(
      phoneNumber: String!
      code: String!
      countryCode: String!
    ): User
    confirmEditedPhoneAuthCode(
      phoneNumber: String!
      code: String!
      countryCode: String!
    ): Boolean
    ########## account mutations ########
    authenticateUser: String
    registerUser(usernameId: String, password: String): Boolean
    loginUser(usernameId: String, password: String): User
    logoutUser: Boolean
    updateUser(usernameId: String, introduction: String): User
    updatePassword(newPass: String): Boolean
    updateUserPhoto(profilePhoto: Upload): File
    uploadProducts(productsImages: [Upload]): [File]
    deleteUser: Boolean
    ########## admin mutations ########
    loginAdmin(usernameId: String, password: String): Admin
    adminDeleteItem(productId: ID): Boolean

    ########## follow mutations ########
    follow(_id: ID): Boolean
    unfollow(_id: ID): Boolean
    ########## cart mutations ########
    addProduct(_id: ID): Boolean
    removeProduct(_id: ID): Boolean
    deleteProduct(_id: ID): Boolean
    ########## notification mutations ########
    updateNotification(
      pushNoti: Boolean
      directMessage: Boolean
      marketing: Boolean
    ): Boolean
    ########## product mutations ########
    createProduct(
      user: ID
      images: [Upload]
      price: Int
      brand: String
      category: String
      condition: String
      size: String
      style: String
      description: String
      soldOut: Boolean
    ): Boolean
    updateProduct(
      _id: ID
      newImages: [Upload]
      removedImagesIndexes: [Int]
      price: Int
      brand: String
      category: String
      condition: String
      size: String
      style: String
      description: String
    ): Boolean
    updateSoldProduct(_id: ID, soldOut: Boolean): Boolean
    ########## notification mutations ########
    removeNoti(_id: ID): Boolean
    sendMessage(receiverId: ID, text: String): [Message]
    createRoom(otherUserId: ID): Room
    createCategory(
      name: String!
      image: String
      subCategories: [CategoryInput]
    ): Category
  }
`;
module.exports = [query, types];
