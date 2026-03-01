import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WishlistStore {
    items: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    toggleWishlist: (item: WishlistItem) => void;
    isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (item) => {
                const exists = get().items.find((i) => i.id === item.id);
                if (!exists) {
                    set({ items: [item, ...get().items] });
                }
            },
            removeFromWishlist: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            toggleWishlist: (item) => {
                const exists = get().items.find((i) => i.id === item.id);
                if (exists) {
                    get().removeFromWishlist(item.id);
                } else {
                    get().addToWishlist(item);
                }
            },
            isInWishlist: (id) => {
                return !!get().items.find((i) => i.id === id);
            },
        }),
        {
            name: "wishlist-storage",
        }
    )
);
