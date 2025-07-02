"use client";

import {
  Card, CardHeader, CardBody, CardFooter,
  Input, Table, TableHeader, TableBody, TableRow,
  TableCell, TableColumn, Pagination,
  Spinner
} from "@heroui/react";
import { GoSearch } from "react-icons/go";
import React, {
  useCallback, useEffect, useMemo, useState,
  forwardRef, useImperativeHandle
} from "react";
import { KTableProps } from "@/types/kTables";

function KTableInner<T>(
  { ariaLabel, header, params, fetchData, isCompact }: KTableProps<T>,
  ref: React.Ref<any>
) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchData({ page, limit, search, ...params });
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, fetchData, params]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 🔥 Ini dia, expose refresh ke luar
  useImperativeHandle(ref, () => ({
    refresh: () => loadData(),
    reset: () => {
      setPage(1);
      setSearch("");
      loadData();
    },
  }));

  const pages = useMemo(() => {
    return total ? Math.ceil(total / limit) : 1;
  }, [total, limit]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLimit(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const classNames = useMemo(
    () => ({
      wrapper: ["p-0"],
    }),
    []
  );

  return (
    <Card fullWidth>
      <CardHeader className="flex flex-wrap w-full justify-between items-center">
        <Input
          isClearable
          className="max-w-64"
          placeholder="Cari..."
          size="sm"
          startContent={<GoSearch />}
          onClear={() => setSearch("")}
          onValueChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />

        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </CardHeader>

      <CardBody>
        <Table
          aria-label={ariaLabel}
          isCompact={isCompact}
          isHeaderSticky
          shadow="none"
          fullWidth
          isStriped
          classNames={classNames}
        >
          <TableHeader>
            {header.map((col) => (
              <TableColumn className="bg-[#0272ef] text-white" key={col.id}>
                {col.title}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={loading ? "Memuat data..." : "Tidak ada data"}
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {
              data ? (
                data.map((item, index) => (
                  <TableRow key={index}>
                    {header.map((col) => (
                      <TableCell key={col.id + index}>
                        {col.render
                          ? col.render(item)
                          : (item[col.field as keyof T] as React.ReactNode)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={header.length} className="text-center py-8">Tidak ada Data</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardBody>

      <CardFooter>
        <div className="flex w-full justify-between items-center">
          <div className="text-sm text-gray-500">
            Menampilkan {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, total)} dari {total} data
          </div>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

const KTable = forwardRef(KTableInner) as <T>(
  props: KTableProps<T> & { ref?: React.Ref<any> }
) => ReturnType<typeof KTableInner>;
export default KTable;