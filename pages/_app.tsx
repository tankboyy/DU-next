import { RecoilRoot } from "recoil";

export default function MyApp({ Component }: { Component: any }) {
  return (
    <>
      <RecoilRoot>
        <Component />
      </RecoilRoot>
    </>
  );
}
