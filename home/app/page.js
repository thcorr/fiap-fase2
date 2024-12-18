import { MainFooter } from "../components/MainFooter";
import { MainBody } from "../components/MainBody";
import { MainHeader } from "../components/MainHeader";

export default function Home() {
  return (
    <div className="">
      <MainHeader />
      <MainBody />
      <MainFooter />
      <a href="/logged">
        <h2>LOGGED PAGE</h2>
      </a>
    </div>
  );
}
