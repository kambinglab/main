"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@utils/auth";
import prisma from "@utils/prisma";

const accuseFormSchema = z.object({
  accused_profile_id: z.string().cuid2(),
  accuser_user_id: z.string().cuid2(),
  content: z.string(),
});

export async function accuse(_: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to edit a survey.",
      data: null,
    };
  }

  const validatedFields = accuseFormSchema.safeParse({
    accused_profile_id: formData.get("accused_profile_id"),
    accuser_user_id: formData.get("accuser_user_id"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
      data: null,
    };
  }

  try {
    const accusation = await prisma.accusation.create({
      data: {
        content: validatedFields.data.content,
        accused_profile_id: validatedFields.data.accused_profile_id,
        accuser_user_id: validatedFields.data.accuser_user_id,
      },
    });

    revalidatePath(`/profile/${validatedFields.data.accused_profile_id}`);

    return {
      success: true,
      message: "Accusation submitted successfully.",
      data: accusation,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to submit accusation.",
      data: null,
    };
  }
}
