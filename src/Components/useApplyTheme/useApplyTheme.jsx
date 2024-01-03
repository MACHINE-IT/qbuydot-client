import { useEffect } from 'react';

const useApplyTheme = (themeMode) => {
    useEffect(() => {
        // Apply theme classes to selected elements when component mounts
        document
            .querySelectorAll(
                'html, .header, .product-info, .search-cart, .cart, .item-cart-info, .cart-parent, .availableBalance, .total'
            )
            .forEach((element) => {
                element.classList.remove('dark', 'light');
                element.classList.add(themeMode);
            });
    }, [themeMode]);
};

export default useApplyTheme;
