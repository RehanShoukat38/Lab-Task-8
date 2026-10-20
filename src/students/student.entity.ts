export enum Department {
    ComputerScience = 'Computer Science',
    SoftwareEngineering = 'Software Engineering',
    DataScience = 'Data Science'
}
export interface Student {
    rollNumber: string;
    name: string;
    cgpa: number;
    department: Department;
}
