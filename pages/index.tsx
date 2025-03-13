import Page from "@/template/page";
import { translatoinSchemaType } from "@/types/page";

export default function Home(transation: translatoinSchemaType) {
  return (
    <>
      {Page(transation.data)}
    </>
  );
}
