const fs = require("fs");

(() => {
  const json = fs.readFileSync("D:/Projects/e_commerce/src/api/laptop.json");
  const laptop = JSON.parse(json);
  for (let i = 0; i < laptop.length; i++) {
    laptop[i].id = i + 1;
  }
  fs.writeFileSync(
    "D:/Projects/e_commerce/src/api/laptop.json",
    JSON.stringify(laptop)
  );
})();
