export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    gender: string;
    age: number;
    dateOfBirth: Date;
    knownAs: string;
    // Estos 2 los dejo por ahora pero no se si son necesarios.
    created: Date;
    lastActive: Date;
}
