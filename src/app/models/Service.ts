import { Specialty } from "./Specialty";

export interface Service{
    id: number;  
    specialty: Specialty;
    name: string;
    price: number;
    insurancePrice: number;
}