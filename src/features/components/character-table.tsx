import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import type { Character } from "../../shared/types/character";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { FavoriteButton } from "../../shared/components/favorite-button";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { CharacterStatusBadge } from "../../shared/components/character-status-badge";

interface CharacterTableProps {
  characters: Character[];
}

const columnHelper = createColumnHelper<Character>();

export function CharacterTable({ characters }: CharacterTableProps) {
  const router = useRouter();

  const columns = useMemo<ColumnDef<Character, any>[]>(
    () => [
      columnHelper.accessor("image", {
        header: "Avatar",
        cell: (info) => (
          <Avatar>
            <AvatarImage src={info.getValue()} alt={info.row.original.name} />
            <AvatarFallback>{info.row.original.name[0]}</AvatarFallback>
          </Avatar>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <div className="font-medium">{info.getValue()}</div>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <CharacterStatusBadge
            status={info.getValue()}
            className="flex justify-center items-center rounded-3xl p-0.5"
          />
        ),
      }),
      columnHelper.accessor("species", {
        header: "Species",
        cell: (info) => <Badge variant="secondary">{info.getValue()}</Badge>,
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("created", {
        header: "Created",
        cell: (info) => (
          <span className="text-muted-foreground">
            {format(new Date(info.getValue()), "MMM dd, yyyy")}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <FavoriteButton character={info.row.original} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                router.navigate({
                  to: "/character/$characterId",
                  params: { characterId: info.row.original.id.toString() },
                });
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full sm:px-6 lg:px-8">
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-hidden">
          <Table className="w-full table-fixed ">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs sm:text-sm px-2 py-1"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-xs sm:text-sm px-2 py-1 break-words"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No characters found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
