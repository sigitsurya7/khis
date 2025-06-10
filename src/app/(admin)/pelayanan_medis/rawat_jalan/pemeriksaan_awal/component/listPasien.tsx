import { caraBayar } from "@/data/caraBayar";
import { mLayanan } from "@/data/layanan";
import { mNs } from "@/data/mNs";
import { Card, CardBody, Tabs, Tab, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody } from "@heroui/react";

const TableList = ({ id } : any) => {
    console.log(id)
    return(
        <Table removeWrapper>
            <TableHeader>
                <TableColumn>Tanggal</TableColumn>
                <TableColumn>No. Register</TableColumn>
                <TableColumn>Pasien</TableColumn>
                <TableColumn>Layanan</TableColumn>
                <TableColumn>Jaminan</TableColumn>
                <TableColumn>Dokter</TableColumn>
                <TableColumn>Waktu Tunggu</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Tidak ada data."}>{[]}</TableBody>
        </Table>
    )
}

export default function ListPasien(){
    return(
        <div className="flex flex-col gap-4">
            <Card>
                <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input label="No. Register" placeholder="No. Register" type="number" />

                        <Select label="Jaminan" placeholder="Pilih Jaminan">
                            {
                                caraBayar.map((value, index) => (
                                    <SelectItem key={value.id}>{value.nama}</SelectItem>
                                ))
                            }
                        </Select>

                        <Input label="No. RM" placeholder="No. RM" type="number" />

                        <Select label="layanan" placeholder="Pilih Layanan">
                            {
                                mLayanan.map((value, index) => (
                                    <SelectItem key={value.id}>{value.nama}</SelectItem>
                                ))
                            }
                        </Select>

                        <Input label="Nama" placeholder="Nama" type="text" />

                        <Select label="Dokter" placeholder="Pilih Dokter">
                            <SelectItem isDisabled={true}>Tidak ada dokter</SelectItem>
                        </Select>

                        <Select label="Status" placeholder="Pilih Status">
                            <SelectItem key="">- Semua -</SelectItem>
                            <SelectItem key="-1">Belum Dipanggil</SelectItem>
                            <SelectItem key="1">Dilewat</SelectItem>
                            <SelectItem key="2">Dipanggil</SelectItem>
                        </Select>

                        <Select label="Tipe Registrasi" placeholder="Pilih Tipe Registrasi">
                            <SelectItem key="">- SEMUA -</SelectItem>
                            <SelectItem key="1">DAFTAR DI LOKET</SelectItem>
                            <SelectItem key="2">UMUM DAFTAR DI SINI</SelectItem>
                            <SelectItem key="3">UMUM CHECK IN BOOKING</SelectItem>
                            <SelectItem key="4">BPJS DAFTAR DI SINI</SelectItem>
                            <SelectItem key="5">BPJS CHECK IN BOOKING</SelectItem>
                            <SelectItem key="6">BPJS MOBILE JKN</SelectItem>
                        </Select>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Tabs aria-label="ns" color="primary" radius="full">
                        {
                            mNs.map((value, index) => (
                                <Tab key={value.id} title={value.nama}>
                                    <TableList id={value.id} />
                                </Tab>
                            ))
                        }
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    )
}