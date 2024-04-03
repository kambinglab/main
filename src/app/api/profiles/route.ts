import prisma from "@utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query) return Response.json([]);
  if (query.length < 3) return Response.json([]);
  const result = await prisma.userProfile.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          npm: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      name: true,
      npm: true,
      faculty: true,
      major: true,
      program: true,
    },
    take: 10,
  });
  return Response.json(result);
}
