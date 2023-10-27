import { MissingParamError } from "./MissingParamError";
import { ValidationError } from "./ValidationError";

export interface Validation<T> {
    validate: (input: T) => ValidationError | MissingParamError | null;
}


