"use server";

import { redirect } from "next/navigation";
import { buatSupabaseSesiAdmin } from "@/lib/supabase/server";

export async function masukAdmin(stateSebelumnya, formData) {
  const data = formData instanceof FormData ? formData : stateSebelumnya;
  const email = String(data?.get("email") ?? "").trim();
  const password = String(data?.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Email dan password wajib diisi.",
    };
  }

  let supabase;
  try {
    supabase = await buatSupabaseSesiAdmin();
  } catch {
    return {
      error:
        "Gagal terhubung ke server autentikasi. Pastikan SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY sudah diisi di environment variable.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Email atau password salah. Periksa kembali lalu coba lagi.",
    };
  }

  redirect("/admin");
}

export async function keluarAdmin() {
  try {
    const supabase = await buatSupabaseSesiAdmin();
    await supabase.auth.signOut();
  } catch {
    // Tetap arahkan ke halaman login meskipun koneksi gagal
  }

  redirect("/admin/login");
}

