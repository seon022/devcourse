export interface Customer extends Document {
    name: string;
    address: string;
    email: string;
    description?: string;
}
