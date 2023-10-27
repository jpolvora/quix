import { MissingParamError } from "@/validation/MissingParamError";
import { ValidationError } from "@/validation/ValidationError";

export type Result = {
    success: boolean;
    error?: ValidationError | MissingParamError | Error | string
}

export type Paging = {
    page: number;
    pageSize: number
}

export type CreateAccountInput = {
    id: string;
    accountType: string
}

