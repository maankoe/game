function mockCall(name: string, ...args: any[]) {
    return new Call(name, args);
}

function mockCalls(...calls: Call[]) {
    return new Calls(calls);
}

class Call {
    name: string;
    args: any[];

    constructor(name: string, args: any[]) {
        this.name = name;
        this.args = args;
    }
}

class Calls {
    calls: Call[];

    constructor(calls?: Call[]) {
        if (calls) {
            this.calls = calls;
        } else {
            this.calls = [];
        }
    }

    private add(call: Call) {
        this.calls.push(call);
    }

    mock(name: string, ...args: any) {
        this.add(new Call(name, args))
    }
}


export { mockCall, mockCalls, Calls };