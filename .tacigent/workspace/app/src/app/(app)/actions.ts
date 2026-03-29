"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireServerSession } from "@/lib/auth";
import {
  archiveEvidence,
  archiveSystem,
  createGapTask,
  publishPacket,
  saveAnswer,
  upsertEvidence,
  upsertSystem,
} from "@/lib/demo-store";

export async function saveAnswerAction(formData: FormData) {
  await requireServerSession();

  const questionnaireId = String(formData.get("questionnaireId"));
  const questionId = String(formData.get("questionId"));
  const answer = String(formData.get("answer"));

  saveAnswer({ answer, questionId, questionnaireId });
  revalidatePath("/questionnaires");
  revalidatePath(`/questionnaires/${questionnaireId}`);
  redirect(`/questionnaires/${questionnaireId}?question=${questionId}`);
}

export async function createGapTaskAction(formData: FormData) {
  await requireServerSession();

  const questionnaireId = String(formData.get("questionnaireId"));
  const questionId = String(formData.get("questionId"));
  const owner = String(formData.get("owner"));
  const title = String(formData.get("title"));

  createGapTask({ owner, questionId, questionnaireId, title });
  revalidatePath("/questionnaires");
  revalidatePath(`/questionnaires/${questionnaireId}`);
  redirect(`/questionnaires/${questionnaireId}?question=${questionId}`);
}

export async function publishPacketAction(formData: FormData) {
  await requireServerSession();

  const questionnaireId = String(formData.get("questionnaireId"));
  const packetId = publishPacket(questionnaireId);

  revalidatePath("/questionnaires");
  revalidatePath(`/questionnaires/${questionnaireId}`);

  if (!packetId) {
    redirect(`/questionnaires/${questionnaireId}`);
  }

  redirect(`/packets/${packetId}`);
}

export async function upsertSystemAction(formData: FormData) {
  await requireServerSession();

  upsertSystem({
    description: String(formData.get("description")),
    id: String(formData.get("id") || "") || undefined,
    name: String(formData.get("name")),
    owner: String(formData.get("owner")),
  });

  revalidatePath("/systems");
  redirect("/systems");
}

export async function archiveSystemAction(formData: FormData) {
  await requireServerSession();

  archiveSystem(String(formData.get("id")));
  revalidatePath("/systems");
  redirect("/systems");
}

export async function upsertEvidenceAction(formData: FormData) {
  await requireServerSession();

  const systemIds = String(formData.get("linkedSystemIds"))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  upsertEvidence({
    id: String(formData.get("id") || "") || undefined,
    linkedSystemIds: systemIds,
    source: String(formData.get("source")),
    strength: String(formData.get("strength")) === "high" ? "high" : "medium",
    title: String(formData.get("title")),
    type:
      String(formData.get("type")) === "policy"
        ? "policy"
        : String(formData.get("type")) === "spec"
          ? "spec"
          : "doc",
  });

  revalidatePath("/evidence");
  redirect("/evidence");
}

export async function archiveEvidenceAction(formData: FormData) {
  await requireServerSession();

  archiveEvidence(String(formData.get("id")));
  revalidatePath("/evidence");
  redirect("/evidence");
}
