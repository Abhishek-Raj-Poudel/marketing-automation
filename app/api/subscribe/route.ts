import { NextResponse } from "next/server";

const KLAVIYO_REVISION = "2026-07-15";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_NEWSLETTER_ID;
  if (!key || !listId) {
    return NextResponse.json(
      { error: "Newsletter signup is not configured." },
      { status: 500 },
    );
  }

  let body: { email?: unknown; firstName?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 422 },
    );
  }

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: KLAVIYO_REVISION,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "loom-and-knot-web",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    ...(firstName ? { first_name: firstName } : {}),
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: { list: { data: { type: "list", id: listId } } },
        },
      }),
    },
  );

  if (res.status === 202) {
    return NextResponse.json({ ok: true });
  }
  if (res.status === 429) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }
  if (res.status === 401) {
    return NextResponse.json(
      { error: "Newsletter signup is unavailable." },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { error: "Could not subscribe right now. Try again shortly." },
    { status: 502 },
  );
}
