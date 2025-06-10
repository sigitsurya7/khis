import { caraBayar } from "@/data/caraBayar";
import { mLayanan } from "@/data/layanan";
import { RiResetLeftFill } from "react-icons/ri";
import { Card, CardBody, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, CardFooter, DateRangePicker, Button } from "@heroui/react";

export default function HistoryPerawatRajal(){
    return(
        <div className="flex flex-col gap-2 flex-wrap">
            <Card>
                <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input label="No. Register" placeholder="No. Register" type="number" />

                        <Select label="layanan" placeholder="Pilih Layanan">
                            {
                                mLayanan.map((value, index) => (
                                    <SelectItem key={value.id}>{value.nama}</SelectItem>
                                ))
                            }
                        </Select>

                        <Input label="No. RM" placeholder="No. RM" type="number" />

                        <Select label="Dokter" placeholder="Pilih Dokter">
                            <SelectItem isDisabled={true}>Tidak ada dokter</SelectItem>
                        </Select>

                        <Input label="Nama" placeholder="Nama" type="text" />

                        <Select label="Status" placeholder="Pilih Status">
                            <SelectItem key="">- Semua -</SelectItem>
                            <SelectItem key="-1">Di Periksa</SelectItem>
                            <SelectItem key="1">Batal</SelectItem>
                        </Select>

                        <Select label="Jaminan" placeholder="Pilih Jaminan">
                            {
                                caraBayar.map((value, index) => (
                                    <SelectItem key={value.id}>{value.nama}</SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-center w-full items-center gap-4">
                        <DateRangePicker className="max-w-lg" label="Rentang waktu" />

                        <Button isIconOnly color="primary"><RiResetLeftFill /></Button>
                    </div>
                </CardFooter>
            </Card>

            <Table>
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
        </div>
    )
}