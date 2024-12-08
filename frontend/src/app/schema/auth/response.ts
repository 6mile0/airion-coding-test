export type UserResponse = {
    id: number;
    user_name: string;
    email: string;
    is_active: boolean;
    role: string
    created_at: string;
    updated_at: string;
};

export type CreatedUserResponse = {
    username: string;
    email: string;
}
