interface UserType {
    name: string;
    tokens: string;
    balance: string;
}

interface UserContextType {
    data: UserType
}

export type { UserType, UserContextType };