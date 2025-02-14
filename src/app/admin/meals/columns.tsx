'use client'

import { MealDataTableProps } from "@/lib/definition"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from 'lucide-react'
import Link from "next/link"
import { DeleteMealButton } from "@/components/ui/custom-button"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<MealDataTableProps>[] = [
    {
        accessorKey: 'title',
        header: 'Recette'
    },
    {
        accessorKey: 'country',
        header: 'Pays'
    },
    {
        accessorKey: 'imageUrl',
        header: () => <div>Image</div>,
        // Montrer l'image de la recette
        cell: ({row}) => {
            return (
                <Image
                    src={row.original.imageUrl}
                    alt={row.original.title}
                    width={60}
                    height={60}
                />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const meal = row.original

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">
                            Ouvrir menu
                        </span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"  className="bg-white">
                        <DropdownMenuLabel>
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link
                                href={`/admin/meals/edit/${meal.slug}`}
                            >
                                Modifier le plat
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DeleteMealButton
                                id={meal.id!}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]