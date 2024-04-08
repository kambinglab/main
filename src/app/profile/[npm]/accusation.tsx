import { Accusation, AccusationResponse } from "@prisma/client";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

interface Props {
  accusation: Pick<
    Accusation,
    "id" | "content" | "created_at" | "updated_at"
  > & {
    AccusationResponse: Pick<
      AccusationResponse,
      "id" | "content" | "created_at" | "updated_at"
    >[];
  };
}

const AccusationCard: FC<Props> = ({ accusation }) => {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={createAvatar(funEmoji, {
            seed: accusation.id,
            size: 32,
          }).toDataUriSync()}
          alt="Petarung"
          className="mask mask-squircle h-11 w-11"
        />

        <div>
          <div>Awanama</div>
          <div className="text-sm">
            {new Date(accusation.created_at).toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: new QuillDeltaToHtmlConverter(
            JSON.parse(accusation.content).ops,
            {}
          ).convert(),
        }}
      />
      {accusation.AccusationResponse.map((response) => (
        <div key={response.id} className="border p-4 rounded-lg mt-4">
          <div />
        </div>
      ))}
    </div>
  );
};

export default AccusationCard;
