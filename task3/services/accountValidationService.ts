export class AccountValidationService {

    private errors: string[] = [];

    validate(object: any) {

        // check if id name, address, email is empty
        const keys = Object.keys(object);
        // remove id from array, since this will be generated in the back end
        const arr = keys.filter(item => item !== "id");
        arr.forEach(key => {
            if (!object[key] || !object[key].length) {
                this.errors.push(`${key} cannot be empty`)
            }
        });  


        if (this.errors.length) {
            throw new Error(`Creating account failed validation: ${this.errors.join(", ")}`)            
        }
    }
}
