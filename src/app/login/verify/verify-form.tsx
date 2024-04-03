"use client";

import { useSearchParams, redirect } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { useRef, useEffect } from "react";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const VerifyForm = () => {
  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket");
  if (!ticket) redirect("/");
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useSWR("/api/auth/csrf", fetcher, {});

  useEffect(() => {
    if (data?.csrfToken && ticket) {
      formRef.current?.submit();
    }
  }, [data, ticket]);

  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8">
      <p>Verifying...</p>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="hidden"
        ref={formRef}
      >
        <input
          name="csrfToken"
          type="hidden"
          value={data?.csrfToken ?? ""}
          readOnly
        />
        <input name="ticket" type="hidden" value={ticket ?? ""} readOnly />
      </form>
    </main>
  );
};

export default VerifyForm;
