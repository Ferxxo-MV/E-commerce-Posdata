import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
const CART_STORAGE_KEY = "posdata.cart.v1";
const CartContext = createContext(null);

function loadInitialItems() {
    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function isSameLine(item, companyId, productId) {
    return item.companyId === companyId && item.productId === productId;
}

function cartReducer(items, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const { product, companyId, quantity } = action.payload;
            const exists = items.some((item) => isSameLine(item, companyId, product.id));

            if (exists) {
                return items.map((item) =>
                isSameLine(item, companyId, product.id)
                    ? { ...item, quantity: item.quantity + quantity}
                    : item
                );
            }
            return [
                ...items,
                {
                    companyId,
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                },
            ];
        }
        
        case "SET_QUANTITY": {
            const { companyId, productId, quantity} = action.payload;

            if (quantity <= 0) {
                return items.filter((item) => !isSameLine(item, companyId, productId));      
            }

            return items.map((item) =>
                isSameLine(item, companyId, productId) ? { ...item, quantity } : item
            );
        }

        case "REMOVE_ITEM": {
            const { companyId, productId } = action.payload;
            return items.filter((item) => !isSameLine(item, companyId, productId));
        }

        case "CLEAR_CART":
            return [];

        default:
            return items;
    }
}

export function CartProvider({ children }) {
    const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialItems);

    useEffect(() => {
            try{
                window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch {
                // Sin almacenamiento disponible: el carrito solo vive en memoria.
            }
        }, [items]);

        const value = useMemo(() => {
            const totalItems = items.reduce((total, item) => total + item.quantity, 0);
            const subtotal = items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            return {
                items,
                totalItems,
                subtotal,
                addItem: (product, companyId, quantity = 1) =>
                    dispatch({ type: "ADD_ITEM", payload: { product, companyId, quantity } }),
                setQuantity: (companyId, productId, quantity) =>
                    dispatch({ type: "SET_QUANTITY", payload: { companyId, productId, quantity } }),
                removeItem: (companyId, productId) =>
                    dispatch({ type: "REMOVE_ITEM", payload: { companyId, productId } }),
                clearCart: () => dispatch({ type: "CLEAR_CART" }),
            };
        }, [items]);

        return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe usarse dentri de <CartProvider>");
    }

    return context;
}

