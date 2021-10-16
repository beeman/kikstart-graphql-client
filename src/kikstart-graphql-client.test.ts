import * as kikstart_graphql_client from "./kikstart-graphql-client"

// @ponicode
describe("query", () => {
    let inst: any

    beforeEach(() => {
        inst = new kikstart_graphql_client.GraphQLClient({ url: "https://", wsUrl: "https://twitter.com/path?abc", wsOptions: 12345, cache: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", headers: true, connectionParams: false, log: false, uri: "b'https://example.com:1234/foo?bar'", wsUri: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", mutationLink: "ws", queryLink: "ws", subscriptionLink: "ws" })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.query(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.query("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.query(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.query({ This: "is", an: "object", Do: 0, you: 1, Like: 2, it: 10000 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.query("UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.query(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("runQuery", () => {
    let inst: any

    beforeEach(() => {
        inst = new kikstart_graphql_client.GraphQLClient({ url: "http://www.example.com/route/123?foo=bar", wsUrl: "https://accounts.google.com/o/oauth2/revoke?token=%s", wsOptions: 100, cache: 16, headers: true, connectionParams: "https://api.telegram.org/", log: 1, uri: "b'http://example.com/'", wsUri: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", mutationLink: "ws", queryLink: "ws", subscriptionLink: "ws" })
    })

    test("0", async () => {
        await inst.runQuery(1, {})
    })

    test("1", async () => {
        await inst.runQuery(0, "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
    })

    test("2", async () => {
        await inst.runQuery(false, "UPDATE Projects SET pname = %s WHERE pid = %s")
    })

    test("3", async () => {
        await inst.runQuery(true, "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
    })

    test("4", async () => {
        await inst.runQuery(-5.48, {})
    })

    test("5", async () => {
        await inst.runQuery(-Infinity, false)
    })
})

// @ponicode
describe("runMutation", () => {
    let inst: any

    beforeEach(() => {
        inst = new kikstart_graphql_client.GraphQLClient({ url: "https://", wsUrl: "http://www.example.com/route/123?foo=bar", wsOptions: "bc23a9d531064583ace8f67dad60f6bb", cache: 0, headers: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", connectionParams: false, log: "TypeError exception should be raised", uri: "b'https://example.com:1234/foo?bar'", wsUri: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", mutationLink: "ws", queryLink: "ws", subscriptionLink: "ws" })
    })

    test("0", async () => {
        await inst.runMutation("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", "DELETE FROM Projects WHERE pid = %s")
    })

    test("1", async () => {
        await inst.runMutation("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
    })

    test("2", async () => {
        await inst.runMutation("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", 12345)
    })

    test("3", async () => {
        await inst.runMutation("DELETE FROM Projects WHERE pid = %s", 56784)
    })

    test("4", async () => {
        await inst.runMutation(12345, false)
    })

    test("5", async () => {
        await inst.runMutation(NaN, NaN)
    })
})

// @ponicode
describe("runSubscription", () => {
    let inst: any

    beforeEach(() => {
        inst = new kikstart_graphql_client.GraphQLClient({ url: "http://base.com", wsUrl: "http://base.com", wsOptions: false, cache: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", headers: 987650, connectionParams: false, log: "Error selecting from database", uri: "b'http://example.com/'", wsUri: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", mutationLink: "ws", queryLink: "ws", subscriptionLink: "ws" })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.runSubscription(-1.0, "UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.runSubscription(true, {})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.runSubscription(false, {})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.runSubscription("UPDATE Projects SET pname = %s WHERE pid = %s", "UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.runSubscription(true, 12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.runSubscription(Infinity, {})
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("disconnect", () => {
    let inst: any

    beforeEach(() => {
        inst = new kikstart_graphql_client.GraphQLClient({ url: "https://", wsUrl: "https://accounts.google.com/o/oauth2/revoke?token=%s", wsOptions: "c466a48309794261b64a4f02cfcc3d64", cache: true, headers: "bc23a9d531064583ace8f67dad60f6bb", connectionParams: true, log: 100, uri: "b'http://example.com/foo;1234?bar#frag'", wsUri: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", mutationLink: "http", queryLink: "http", subscriptionLink: "ws" })
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.disconnect()
        }
    
        expect(callFunction).not.toThrow()
    })
})
