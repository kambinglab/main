import { PrismaClient } from "@prisma/client";
import { readdirSync, readFileSync } from "fs";

const CURRENT_ACADEMIC_YEAR = "2023-2024";

const prisma = new PrismaClient();

async function main() {
  readdirSync(`${__dirname}/seed/${CURRENT_ACADEMIC_YEAR}`).forEach(
    async (file: string) => {
      const seed = readFileSync(
        `${__dirname}/seed/${CURRENT_ACADEMIC_YEAR}/${file}`,
        "utf-8"
      );
      const data: {
        faculty: string;
        npm: string;
        name: string;
        program: string;
        major: string;
      }[] = [];
      seed.split("\n").forEach(async (line, i) => {
        if (i === 0) return;
        const [faculty, npm, name, program, major] = line
          .trim()
          .substring(1, line.trim().length - 2)
          .split(", ")
          .map((x) => x.substring(1, x.length - 1));
        data.push({
          faculty,
          npm,
          name,
          program,
          major,
        });
      });
      await prisma.userProfile.createMany({
        data,
      });
      console.log(`Seeded ${file}`);
    }
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
