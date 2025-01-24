import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
      >
        Return Home
      </Link>
    </div>
  );
}
