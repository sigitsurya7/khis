import { Metadata } from "next";
import TabsPenagihanAsuransi from "./component/tabs";

export const metadata: Metadata = {
  title:
    "KHIS | Penagihan Asuransi",
  description: "Penagihan Asuransi",
};

export default function PenagihanAsuransi(){
    return (
        <div>
          <TabsPenagihanAsuransi />
        </div>
    )
}