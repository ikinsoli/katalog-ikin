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

export async function gantiPasswordAdmin(stateSebelumnya, formData) {
  const data = formData instanceof FormData ? formData : stateSebelumnya;
  const passwordBaru = String(data?.get("password_baru") ?? "");
  const konfirmasiPassword = String(data?.get("konfirmasi_password") ?? "");

  let supabase;
  try {
    supabase = await buatSupabaseSesiAdmin();
  } catch {
    return {
      error:
        "Gagal terhubung ke server autentikasi. Pastikan SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY sudah diisi di environment variable.",
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: "Sesi login tidak ditemukan. Silakan masuk kembali terlebih dahulu.",
    };
  }

  if (passwordBaru.length < 8) {
    return {
      error: "Password baru wajib diisi dan minimal 8 karakter.",
    };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return {
      error: "Konfirmasi password tidak sama dengan password baru.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return {
      error:
        "Gagal mengganti password. Pastikan password baru berbeda dari password lama dan coba lagi.",
    };
  }

  return {
    sukses: "Password berhasil diganti.",
  };
}
