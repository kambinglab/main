import prisma from "@utils/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Accuse from "./accuse";
import { auth } from "@utils/auth";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

async function getProfiles(npm: string) {
  const profile = await prisma.userProfile.findMany({
    where: {
      npm,
    },
    include: {
      Accusation: {
        select: {
          id: true,
          content: true,
          created_at: true,
          updated_at: true,
          is_deleted: true,
          AccusationResponse: {
            select: {
              id: true,
              content: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      },
    },
  });
  return profile.map((profile) => ({
    ...profile,
    Accusation: profile.Accusation.filter(
      (accusation) => accusation.is_deleted === false
    ),
  }));
}

export default async function Page({
  params,
}: Readonly<{ params: { npm: string } }>) {
  const profiles = await getProfiles(params.npm);
  const session = await auth();
  if (profiles.length === 0) notFound();
  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>{params.npm}</li>
        </ul>
      </div>
      <div className="flex flex-col gap-8">
        {profiles.map((profile) => (
          <div key={profile.program}>
            <h2 className="font-bold text-2xl">{profile.name}</h2>
            <p className="text-xl">
              {profile.faculty} - {profile.major} - {profile.program}
            </p>
            <div className="mt-4">
              <Accuse profile={profile} user={session?.user} />
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {profile.Accusation.map((accusation) => (
                <div key={accusation.id} className="border p-4 rounded-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: new QuillDeltaToHtmlConverter(
                        JSON.parse(accusation.content).ops,
                        {}
                      ).convert(),
                    }}
                  />
                  {accusation.AccusationResponse.map((response) => (
                    <div
                      key={response.id}
                      className="border p-4 rounded-lg mt-4"
                    >
                      <div />
                    </div>
                  ))}
                </div>
              ))}
              {profile.Accusation.length === 0 && (
                <p className="">Belum ada tuduhan matil 👍</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
