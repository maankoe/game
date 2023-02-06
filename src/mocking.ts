function mockCall(name: string, ...args: any) {
    return new Call(name, args);
}

class Call {
    name: string;
    args: any[]

    constructor(name: string, args: any[]) {
        this.name = name;
        this.args = args;
    }
}

export { mockCall, Call };