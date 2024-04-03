import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8">
      <div className="prose">
        <h1>404 - Halaman tidak ditemukan</h1>
        <p>
          <Link href="/">Kembali ke halaman utama</Link>
        </p>
      </div>
    </main>
  );
}
