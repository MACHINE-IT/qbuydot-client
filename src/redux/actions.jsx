export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const CHECKOUT = 'CHECKOUT';
export const SET_THEME_MODE = 'SET_THEME_MODE';

export const darkThemeMode = (themeStatus) => {
    return {
        type: SET_THEME_MODE,
        payload: themeStatus
    };
}
export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    };
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId,
    };
};

export const incrementQuantity = (productId) => {
    return {
        type: INCREMENT_QUANTITY,
        payload: productId,
    };
};

export const decrementQuantity = (productId) => {
    return {
        type: DECREMENT_QUANTITY,
        payload: productId,
    };
};