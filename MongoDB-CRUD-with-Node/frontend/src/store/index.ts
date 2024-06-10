import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface IProductItem {
  _id: string;
  bookname: string;
  author: string;
  image: string;
  price: number;
}

interface ICartItem {
  product: IProductItem;
  quantity: number;
}

interface IState {
  cart: ICartItem[];
  addToCart: (product: IProductItem, quantity: number) => void;
  increaseQuantity: (product: IProductItem) => void;
  decreaseQuantity: (product: IProductItem) => void;
  removeFromCart: (product: IProductItem) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<IState>(
    (set, get) => ({
      cart: [],
      addToCart: (product: IProductItem, quantity: number) => {
        const productExist = get().cart.find((item) => item.product._id === product._id);
        if (productExist) {
          set({ cart: get().cart.map((item) => (item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item)) });
        } else {
          set({ cart: [...get().cart, { product, quantity }] });
        }
      },
      increaseQuantity: (product: IProductItem) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
        })),
      decreaseQuantity: (product: IProductItem) => {
        const productExist = get().cart.find((item) => item.product._id === product._id);
        if (productExist && productExist.quantity > 1) {
          set({ cart: get().cart.map((item) => (item.product._id === product._id ? { ...item, quantity: item.quantity - 1 } : item)) });
        } else {
          set({ cart: get().cart.filter((item) => item.product._id !== product._id) });
        }
      },
      removeFromCart: (product: IProductItem) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product._id !== product._id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart' }
  )
);
