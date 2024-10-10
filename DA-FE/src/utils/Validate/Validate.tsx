export class Validate{
    static validateEmail(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static validatePassword(password: string): boolean {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(password);
    }

    static validateUsername(username: string): boolean {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    static validateName(name: string): boolean {
        const re = /^[a-zA-Z]+$/;
        return re.test(name);
    }

    static validateRole(role: string): boolean {
        const re = /^[a-zA-Z]+$/;
        return re.test(role);
    }

    static validateText(text: string): boolean {
        const re = /^[a-zA-Z]+$/;
        return re.test(text);
    }
}