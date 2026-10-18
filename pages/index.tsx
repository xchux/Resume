import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DEFAULT_LOCALE_PATH = "/zh-TW";

// Static export has no server redirects, so redirect on the client with a
// meta-refresh fallback for when JS is unavailable.
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(DEFAULT_LOCALE_PATH);
  }, [router]);

  return (
    <>
      <Head>
        <meta
          httpEquiv="refresh"
          content={`0; url=/Resume${DEFAULT_LOCALE_PATH}`}
        />
      </Head>
      <p className="p-6 text-center">
        <Link href={DEFAULT_LOCALE_PATH}>繁體中文</Link>
      </p>
    </>
  );
}
