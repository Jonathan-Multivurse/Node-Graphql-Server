/********************* account mutation resolvers ***************************/
const { authenticateUser } = require("./mutations/user/account/authenticate");
const { registerUser } = require("./mutations/user/account/register");
const { loginUser } = require("./mutations/user/account/login");
const { logoutUser } = require("./mutations/user/account/logout");
const { updatePassword } = require("./mutations/user/account/updatePassword");
/************fvfve */
const {
  updateNotification,
} = require("./mutations/user/notification/updateNoti");
const {
  updateUser,
  updateUserPhoto,
  uploadProducts,
} = require("./mutations/user/account/update");
const { deleteUser } = require("./mutations/user/account/delete");
const {
  getPhoneAuthCode,
} = require("./mutations/user/account/getPhoneAuthCode");
const {
  confirmPhoneAuthCode,
} = require("./mutations/user/account/confirmPhoneAuthCode");
const {
  confirmEditedPhoneAuthCode,
} = require("./mutations/user/account/confirmEdited");
/********************* account query resolvers *****************************/
const { fetchUser } = require("./queries/user/account/fetchUser");
const { fetchUsers } = require("./queries/admin/fetchUsers");
const { fetchUserdetails } = require("./queries/user/account/fetchUserdetails");
/********************* follow mutation resolvers *****************************/
const { follow } = require("./mutations/user/follow/follow");
const { unfollow } = require("./mutations/user/follow/unfollow");
/********************* follow query resolvers *****************************/
const { getFollowing } = require("./queries/user/follow/getFollowing");
const { getFollowers } = require("./queries/user/follow/getFollowers");
const {
  getMostRecentFollowing,
} = require("./queries/user/follow/getMostRecentFollowing");
/********************* product mutation resolvers *****************************/
const { createProduct } = require("./mutations/user/product/create");
const { updateSoldProduct } = require("./mutations/user/product/updateSold");
const { updateProduct } = require("./mutations/user/product/updateProduct");
const { addProduct } = require("./mutations/user/product/add");
const { removeProduct } = require("./mutations/user/product/remove");
const { deleteProduct } = require("./mutations/user/product/delete");
/********************* product query resolvers *****************************/
const { getProduct } = require("./queries/user/product/getProduct");
const { getProductById } = require("./queries/user/product/getProductById");
const { getProducts } = require("./queries/admin/getProducts");
const {
  getPopularCategories,
} = require("./queries/user/category/getPopularCategories");
const {
  getRecommendedProducts,
} = require("./queries/user/product/getRecommendedProducts");
const { getAllProducts } = require("./queries/user/product/getAllProducts");
const { searchProducts } = require("./queries/user/product/searchProducts");
const { getFeedProducts } = require("./queries/user/product/getFeedProducts");
const { getSoldProducts } = require("./queries/user/product/getSoldProducts");
const { productDetails } = require("./queries/user/product/productDetails");
const { getSold } = require("./queries/admin/getSold");
const { getCategories } = require("./queries/user/category/getCategories");
const { getCategoryById } = require("./queries/user/category/getCategoryById");
/********************* follow mutation resolvers *****************************/
const { removeNoti } = require("./mutations/user/notification/delete");
const { sendMessage } = require("./mutations/user/message/sendMessage");
const { createRoom } = require("./mutations/user/message/createRoom");
const { getRoom } = require("./queries/user/messages/getRoom");
const { getRooms } = require("./queries/user/messages/getRooms");
const { fetchPopularUsers } = require("./queries/user/home/fetchPopularUsers");
const { fetchUserById } = require("./queries/user/account/fetchUserById");
const { createCategory } = require("./mutations/user/category/createCategory");
const { loginAdmin } = require("./mutations/admin/login");
const { adminDeleteItem } = require("./mutations/admin/adminDeleteItem");

module.exports = {
  Query: {
    //******USER QUERIES*********//
    /********************************/
    /*account query resolvers*/
    fetchUsers: fetchUsers,
    fetchUser: fetchUser,
    fetchUserdetails: fetchUserdetails,
    fetchUserById: fetchUserById,
    /*follow query resolvers*/
    getFollowing: getFollowing,
    getMostRecentFollowing: getMostRecentFollowing,
    getFollowers: getFollowers,
    /*product query resolvers*/
    getProduct: getProduct,
    getProducts: getProducts,
    productDetails: productDetails,
    getSold: getSold,
    getSoldProducts: getSoldProducts,
    getRoom: getRoom,
    getRooms: getRooms,
    getRecommendedProducts: getRecommendedProducts,
    fetchPopularUsers: fetchPopularUsers,
    getPopularCategories: getPopularCategories,
    getAllProducts: getAllProducts,
    getFeedProducts: getFeedProducts,
    getProductById: getProductById,
    getCategories: getCategories,
    getCategoryById: getCategoryById,
    searchProducts: searchProducts,
  },
  Mutation: {
    //******USER MUTATIONS*********//
    /********************************/
    /*account mutation resolvers*/
    authenticateUser: authenticateUser,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    updateUser: updateUser,
    updateUserPhoto: updateUserPhoto,
    uploadProducts: uploadProducts,
    deleteUser: deleteUser,
    getPhoneAuthCode: getPhoneAuthCode,
    confirmPhoneAuthCode: confirmPhoneAuthCode,
    confirmEditedPhoneAuthCode: confirmEditedPhoneAuthCode,
    updatePassword: updatePassword,
    /*account mutation resolvers*/
    follow: follow,
    unfollow: unfollow,
    /*product mutation resolvers*/
    createProduct: createProduct,
    updateSoldProduct: updateSoldProduct,
    updateProduct: updateProduct,
    addProduct: addProduct,
    removeProduct: removeProduct,
    deleteProduct: deleteProduct,
    /*notification mutation resolvers*/
    removeNoti: removeNoti,
    updateNotification: updateNotification,
    /*message mutation resolvers*/
    sendMessage: sendMessage,
    createRoom: createRoom,
    createCategory: createCategory,
    ////*admin mutation resolvers*////
    loginAdmin: loginAdmin,
    adminDeleteItem: adminDeleteItem
  },
};
