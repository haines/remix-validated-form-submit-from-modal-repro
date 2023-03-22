import type { DataFunctionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";

const validator = withZod(
  z.object({
    name: z.string(),
  })
);

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  console.info({ name: formData.get("name") });
  return redirect("/");
}

interface SubmitModalProps {
  formId: string;
  open: boolean;
}

function SubmitModal({ formId, open }: SubmitModalProps) {
  if (!open) return null;

  return (
    <div>
      <p>Are you sure?</p>
      <button type="submit" form={formId}>Yes</button>
    </div>
  )
}


export default function Index() {
  const [submitUnvalidatedModalOpen, setSubmitUnvalidatedModalOpen]= useState(false);
  const [submitValidatedModalOpen, setSubmitValidatedModalOpen]= useState(false);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Unvalidated form</h1>

      <Form id="unvalidated" method="post" onSubmit={() => setSubmitUnvalidatedModalOpen(false)}>
        <input name="name" />
        <button type="button" onClick={() => setSubmitUnvalidatedModalOpen(true)}>Save</button>
      </Form>

      <SubmitModal formId="unvalidated" open={submitUnvalidatedModalOpen} />

      <h1>Validated form</h1>

      <ValidatedForm id="validated" method="post" validator={validator} onSubmit={() => setSubmitValidatedModalOpen(false)}>
        <input name="name" />
        <button type="button" onClick={() => setSubmitValidatedModalOpen(true)}>Save</button>
      </ValidatedForm>

      <SubmitModal formId="validated" open={submitValidatedModalOpen} />
    </div>
  );
}
