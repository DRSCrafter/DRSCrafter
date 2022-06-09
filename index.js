require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const joke = await (await fetch("https://quotenjoke.vercel.app/joke")).json();

  console.log(joke);

  const readme = readmeTemplate.replace("{joke}", joke.joke);

  await fs.writeFile("README.md", readme);
}

main();
