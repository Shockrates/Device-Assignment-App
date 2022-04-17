export class Employee {

    id: any;
    _id: any;
    name: string;
    email: string;

    constructor(name: string, email: string, id?: any, _id?: any) {

        this.id = id;
        this.name = name;
        this.email = email;
        this._id = _id
    }

    getEmployeeInfo() {
        return {
            "id": this.id,
            "name": this.name,
            "email": this.email,
        }
    }

}
