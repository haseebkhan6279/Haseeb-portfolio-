import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-start justify-center pt-28">
      <p className="kicker">404</p>
      <h1 className="h-display mt-4">This page isn’t here.</h1>
      <p className="lede mt-5 max-w-md">The link may be old, or the project moved. Head home or browse the work.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/work" className="btn btn-ghost">
          All work
        </Link>
      </div>
    </section>
  );
}
