import prisma from "@utils/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Accuse from "./accuse";

async function getProfiles(npm: string) {
  const profile = await prisma.userProfile.findMany({
    where: {
      npm,
    },
    include: {
      Accusation: {
        select: {
          id: true,
          title: true,
          content_html: true,
          created_at: true,
          updated_at: true,
          AccusationResponse: {
            select: {
              id: true,
              content_html: true,
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
            <h2 className="font-bold text-2xl">
              {profile.name}
              <span className="font-normal">
                {" - "}
                {profile.npm}
              </span>
            </h2>
            <p className="text-xl">
              {profile.faculty} - {profile.major} - {profile.program}
            </p>
            <div className="mt-4">
              <Accuse />
            </div>
            <div className="border mt-4 rounded-lg p-4">
              {profile.Accusation.map((accusation) => (
                <div key={accusation.id} className="border p-4 rounded-lg mt-4">
                  <h3 className="font-bold text-lg">{accusation.title}</h3>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: accusation.content_html,
                    }}
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(accusation.created_at).toLocaleString()} -{" "}
                    {new Date(accusation.updated_at).toLocaleString()}
                  </div>
                  {accusation.AccusationResponse.map((response) => (
                    <div
                      key={response.id}
                      className="border p-4 rounded-lg mt-4"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: response.content_html,
                        }}
                      />
                      <div className="mt-2 text-sm text-gray-500">
                        {new Date(response.created_at).toLocaleString()} -{" "}
                        {new Date(response.updated_at).toLocaleString()}
                      </div>
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
