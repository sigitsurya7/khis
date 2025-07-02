import { Metadata } from "next";
import DTagihan from "./component/dTagihan";

export const metadata: Metadata = {
  title:
    "KHIS | Penagihan Bpjs",
  description: "Penagihan Bpjs",
};

export default function PenagihanBpjs(){
    
    return (
        <>
            <DTagihan />
        </>
    )
}