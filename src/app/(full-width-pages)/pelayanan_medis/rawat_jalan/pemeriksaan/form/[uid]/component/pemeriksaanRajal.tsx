"use client"
import TabsLayout from "@/components/tabs/tabsLayout";
import {
  Tab, 
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiAlignRight, BiArrowBack } from "react-icons/bi";
import { setTimeout } from "timers";

interface PemeriksaanRajal {
  uid?: string;
}

export default function PemeriksaanRajal({ uid }: PemeriksaanRajal){
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [variant, setVariant] = useState<null | string>(null);
    const [ loading, setLoading ] = useState(true)

    const router = useRouter()

    const handleOpenDrawer = () => {
        setVariant("drawer");
        onOpen();
    };

    const handleOpenModal = (variant: string) => {
        setVariant(variant);
        onOpen();
    };

    const handleClose = () => {
        setVariant(null);
        onClose();
    };

    const kembali = () => {
        router.push('/pelayanan_medis/rawat_jalan/pemeriksaan_dokter')
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [uid])

    if(loading){
        return(
            <div className="w-screen h-screen p-4">
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-between flex-wrap items-center">
                        <Skeleton className="w-60 rounded-lg">
                            <div className="h-8 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        
                        <Skeleton className="w-60 rounded-lg hidden md:block">
                            <div className="h-8 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap gap-4 items-start">
                        <Skeleton className="w-full md:w-32 rounded-lg ">
                            <div className="h-8 md:h-80 w-full rounded-lg bg-secondary" />
                        </Skeleton>

                        <Skeleton className="w-full rounded-lg">
                            <div className="h-96 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <>
                <div className="flex flex-col p-4 w-full">
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold uppercase cursor-pointer" onClick={() => handleOpenModal('info_pasien')}>TN ATDHI CAHYANTO / 00000398</span>
    
                            <div className="hidden md:flex gap-1">
                                <Button color="warning">Kirim Penunjang</Button>
                                <Button color="primary" onPress={() => handleOpenModal('kirim_kasir')}>Kirim Kasir</Button>
                                <Button color="secondary">Kirim Rawat Inap</Button>
                                <Button color="default" onPress={() => kembali()}>Kembali</Button>
                            </div>
    
                            <div className="md:hidden block">
                                <Button isIconOnly aria-label="open" size="sm" onPress={handleOpenDrawer}>
                                    {
                                    isOpen && variant === 'drawer' ? (
                                        <BiArrowBack />
                                    ) : (
                                        <BiAlignRight />
                                    )
                                    }
                                </Button>
                            </div>
                        </div>
                        
                        <TabsLayout uid={uid}>
                            <Tab key="pemeriksaan_awal" title="Pemeriksaan awal" />
                            <Tab key="pemeriksaan_dokter" title="Pemeriksaan dokter" />
                        </TabsLayout>
                    </div>
                </div>
    
                <Modal backdrop="blur" isOpen={isOpen && variant === "kirim_kasir"} onOpenChange={handleClose}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p>Isi modal di sini, bisa apa aja.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                            Action
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
    
                <Modal backdrop="blur" isOpen={isOpen && variant === "info_pasien"} onOpenChange={handleClose} size="5xl">
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Informasi Pasien</ModalHeader>
                        <ModalBody>
                            Suhu pasien naik <br /> Kesadaran menurun
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
    
                <Drawer isOpen={isOpen && variant === "drawer"} placement="bottom" onOpenChange={handleClose}>
                    <DrawerContent>
                    {(onClose) => (
                        <>
                        <DrawerHeader className="flex flex-col gap-1">Menu</DrawerHeader>
                        <DrawerBody>
                            <Button color="warning">Kirim Penunjang</Button>
                            <Button color="primary" onPress={() => handleOpenModal('kirim_kasir')}>Kirim Kasir</Button>
                            <Button color="secondary">Kirim Rawat Inap</Button>
                            <Button color="default">Kembali</Button>
                        </DrawerBody>
                        </>
                    )}
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

}