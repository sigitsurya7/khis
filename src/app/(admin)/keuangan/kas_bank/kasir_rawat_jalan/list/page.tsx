import { Metadata } from "next";
import TabsListKasirRawatJalan from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | List Kasir",
  description: "List Kasir",
};

export default function ListKasirRawatJalan(){
    return (
        <div>
          <TabsListKasirRawatJalan />
        </div>
    )
}