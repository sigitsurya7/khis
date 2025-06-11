"use client"
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { ReactNode } from "react";
import { useSafeMediaQuery } from "@/config/mediaQuery";
import InformasiPasien from "./component/InformasiPasien";
import InformasiUmum from "./component/informasiUmum";

interface TabsLayoutProps {
  children: ReactNode;
  uid?: string;
}

export default function TabsLayout({ children, uid }: TabsLayoutProps){
    const isMd = useSafeMediaQuery('(min-width: 640px)');

    return(
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" isVertical={isMd ? true : false} fullWidth={isMd ? false : true} color="primary" radius={isMd ? 'md' : 'full'}>
                <Tab key="informasi_pasien" title="Informasi Pasien">
                    <InformasiPasien />
                </Tab>
                <Tab key="informasi_umum" title="Informasi umum">
                    <InformasiUmum />
                </Tab>
                {children}
                <Tab key="farmasi" title="Farmasi">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="rad" title="Radiologi">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="lab" title="Laboratorium">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="penunjang" title="Penunjang">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="uploads" title="Uploads">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    )
}