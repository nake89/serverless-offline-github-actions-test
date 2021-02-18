import { spawn } from "child_process";
import kill from "tree-kill";
import fetch from "node-fetch";

describe("offline tests", () => {
  beforeAll(() => {});

  it("test endpoint", async (done) => {
    let spawnProcess = spawn(
      process.cwd() + "/node_modules/serverless/bin/serverless.js",
      ["offline", "start"]
    );
    spawnProcess.stdout.on("data", async function (msg) {
      //
      if (/server ready/.test(msg.toString())) {
        console.log(msg.toString());
        const response = await fetch("http://localhost:3000/dev/hello");
        const data = await response.json();
        expect(data.hello).toBe("world");
        kill(spawnProcess.pid);
        done();
      }
    });
    spawnProcess.stderr.on("data", function (msg) {
      console.log(msg.toString());
    });
    //    sleep(10);
    // let asd = 1;
    // expect(asd).toBe(1);
    // kill(spawnProcess.pid);
  });
});
