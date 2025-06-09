import { Metadata } from "next";
import TabsListKasirRawatInap from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | List Kasir",
  description: "List Kasir",
};

export default function ListKasirRawatJalan(){
    return (
        <div>
          <TabsListKasirRawatInap />
        </div>
    )
}