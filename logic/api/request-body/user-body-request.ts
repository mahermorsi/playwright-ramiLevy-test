interface UserBodyRequest {
    first_name: string;
    last_name: string;
    phone: string;
    additional_phone: any;
    sex_id: number;
    birth_date: string;
}

const setUserBodyRequest = (
    firstName: string,
    lastName: string,
    phone: string,
    sex_id: number,
    birth_date: string
): UserBodyRequest => {
    return {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        additional_phone: null,
        sex_id: sex_id,
        birth_date: birth_date
    };
};



export { UserBodyRequest, setUserBodyRequest };
