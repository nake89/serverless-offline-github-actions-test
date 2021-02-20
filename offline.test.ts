import { spawn } from "child_process"
import kill from "tree-kill"
import fetch from "node-fetch"

const urlPrefix = "http://localhost:4000/test/"
let spawnProcess
describe("offline tests", () => {
    beforeAll(async (done) => {
        await setup(done)
        //done()
    })

    afterAll(() => {
        // kill(spawnProcess.pid)
    })

    it("should register user", async () => {
        const data = await register("username@example.com")
        console.log("DATA WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
        console.log(data)
        expect(data.ok).toBe(1)
    }, 5000)

    it("should not register user (user already exits)", async () => {
        await register("username+1@example.com")
        const res = await register("username+1@example.com")
        expect(res.ok).toBe(0)
    }, 5000)

    it("should login user", async () => {
        await register("username+2@example.com")
        const res = await login("username+2@example.com")
        expect(typeof res.data.token === "string").toBe(true)
        expect(res.ok).toBe(1)
    }, 5000)

    it("should not login user (user does not exist)", async () => {
        const res = await login("username+3@example.com")
        console.log(res)
        expect(res.ok).toBe(0)
    }, 5000)
})

async function setup(done: Function) {
    spawnProcess = spawn(
        process.cwd() + "/node_modules/serverless/bin/serverless.js",
        ["offline", "start", "--env", "test"]
    )
    spawnProcess.stdout.on("data", async function (msg) {
        if (/server ready/.test(msg.toString())) {
            done()
        }
    })
    spawnProcess.stderr.on("data", function (msg) {
        console.log(msg.toString())
    })
    spawnProcess.on("close", function (code) {
        console.log(`CCCCCCCCCCCCCC Closed with code ${code}`)
    })
}

async function request(
    postfix: string,
    body?: object | null,
    method?: string | null
) {
    const requestUrl = urlPrefix + postfix
    let response
    try {
        let options = {
            method: method ? method : body ? "post" : "get",
            body: body ? JSON.stringify(body) : undefined,
            headers: body ? { "Content-Type": "application/json" } : undefined,
        }
        console.log("OPTIONS")
        console.log("OPTIONS")
        console.log("OPTIONS")
        console.log("OPTIONS")
        console.log(options)
        response = await fetch(requestUrl)
    } catch (e) {
        console.log(e)
        console.log(requestUrl)
        throw "Fail"
    }

    return await response.json()
}

type Register = {
    ok: number
}
async function register(username?: string): Promise<Register> {
    return await request("user/register", {
        username: username ? username : "username@example.com",
        email: username ? username : "username@example.com",
        password: "asdfQWER1234!",
    })
}

type Login = {
    ok: number
    data: { token: string }
}
async function login(username?): Promise<Login> {
    return await request("user/login", {
        username: username ? username : "username@example.com",
        password: "asdfQWER1234!",
    })
}
