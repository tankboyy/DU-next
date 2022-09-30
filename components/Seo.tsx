import Head from "next/head";

export default function Seo({ title }: { title: string }) {
  return (
    <>
      <Head>
        <title>{`${title} | 꿈빛나래`}</title>
      </Head>
    </>
  );
}
