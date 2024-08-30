import { createServerSupabaseClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code); // Web Client에서는 전송받은 code값을 활용해서 로그인 세션을 획득
  }

  return NextResponse.redirect(requestUrl.origin);
}
