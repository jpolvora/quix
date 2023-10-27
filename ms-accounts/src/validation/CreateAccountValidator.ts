import { CreateAccountInput } from "@/use-cases";
import { Validation } from "./Validation";
import { ValidationError } from "./ValidationError";

export class CreateAccountValidator implements Validation<CreateAccountInput> {

    validate(input: CreateAccountInput) {
        if (!input.id || !input.id.length || input.id.length !== 36) {
            return new ValidationError("id");
        }

        if (!input.accountType) {
            return new ValidationError("accountType");
        }

        return null;
    }

}
