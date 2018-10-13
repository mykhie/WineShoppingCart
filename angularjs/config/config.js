
/***
 * get the current host where the application is running then add our end point
 * */
var getUrl = window.location;
/***
 *Create our end point fot the cart
 * */
const BASE_URL = getUrl.protocol + "//" + getUrl.host
    + "/" + getUrl.pathname.split('/')[0] + 'WineShoppingCart/CartApi/Api_Rest/';