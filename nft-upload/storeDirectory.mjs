import { NFTStorage } from "nft.storage";
import { getFilesFromPath } from "files-from-path";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZDMDFEYUEyMDYxOTIxNzQ4OUMyRjEyNDk5MDYzMTM1MDdEMGY2YTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDg5OTU0MDQ4OCwibmFtZSI6InR1dG9yaWFsIn0.A3LB0R90Tbcg1YPuedruLhQSSwwWhlZNFio-402Qgyo";

async function main() {
  const path = process.argv.slice(2);
  console.log(`path: ${path}`);

  const files = await getFilesFromPath(path);

  const storage = new NFTStorage({ token });

  console.log(`storeing ${files.length} files(s) from ${path}`);

  const cid = await storage.storeDirectory(files, {
    pathPrefix: path,
    hidden: true,
  });

  console.log({ cid });

  const status = await storage.status(cid);
  console.log("status :>> ", status);
}

main();

// const path = process.argv.slice(2);
// console.log(`path: ${path}`);
// console.log("Original");
// console.log(process.argv[2]);
// console.log(process.argv.slice(2));

const path = process.argv[2];

const files = await getFilesFromPath(path);
console.log("files :>> ", files);
console.log("length :>> ", files.length);
