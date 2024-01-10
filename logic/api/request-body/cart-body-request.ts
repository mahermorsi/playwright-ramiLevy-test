import { DateTimeFormat } from "../../../utils/date-time-format";

interface CartItem {
    [productId: string]: string;
}

interface CartBodyRequest {
    store: string;
    isClub: number;
    supplyAt: string;
    items: CartItem;
    meta: any; 
}

const setCartBodyRequest = (
    store: string,
    isClub: number,
    items: CartItem
): CartBodyRequest => {
    return {
        store: store,
        isClub: isClub,
        supplyAt: DateTimeFormat.getCurrentDateTime(),
        items: items,
        meta: null
    };
};

export { CartBodyRequest, setCartBodyRequest,CartItem };
