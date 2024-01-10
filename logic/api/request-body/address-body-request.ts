interface AddressBodyRequest {
    name: string | null;
    city_id: number;
    city: string;
    street: string;
    street_number: string;
    zip: any;
    apartment: string;
    entrance:any;
    floor: string;
}

const setAddressBodyRequest = (
    city_id: number,
    city: string,
    street: string,
    street_number: string,
    apartment: string,
    floor: string
): AddressBodyRequest => {
    return {
        name: null,
        city_id: city_id,
        city: city,
        street: street,
        street_number: street_number,
        zip: null,
        apartment: apartment,
        entrance: null,
        floor: floor
    };
};

export { AddressBodyRequest, setAddressBodyRequest };
