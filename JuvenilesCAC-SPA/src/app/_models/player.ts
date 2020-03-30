import { Photo } from './photo';

export interface Player {
    id: number;
    surname: string;
    names: string;
    dateOfBirth: Date;
    age: number;
    dateOfJoin?: Date;
    height?: number;
    photoUrl?: string;
    photos?: Photo[];
}
