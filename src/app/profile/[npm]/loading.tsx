
import Link from "next/link";

export default function Loading() {
  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            Loading...
          </li>
        </ul>
      </div>
    </main>
  );
}
