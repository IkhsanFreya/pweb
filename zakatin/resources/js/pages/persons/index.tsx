import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { MoreHorizontal, Search, UserPlus, Users } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Persons',
        href: '/persons',
    },
];

export default function Persons({ persons, categories, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('persons.index'),
            {
                search: searchTerm,
                category: selectedCategory,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePageChange = (page) => {
        router.get(
            route('persons.index', { page }),
            {
                search: searchTerm,
                category: selectedCategory,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        router.get(route('persons.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Persons" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title="Persons" />

                <div className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Persons</h1>
                        <Button onClick={() => router.visit(route('persons.create'))}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Person
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Search & Filter</CardTitle>
                            <CardDescription>Find persons based on name, category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div className="relative">
                                        <Search className="absolute top-3 left-2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search by name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>

                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={undefined}>All Categories</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="flex space-x-2">
                                        <Button type="submit" className="flex-1">
                                            Filter
                                        </Button>
                                        <Button type="button" variant="outline" onClick={handleClearFilters} className="flex-1">
                                            Clear
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Person List</CardTitle>
                            <CardDescription>{persons.total} persons found</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Family Role</TableHead>
                                        <TableHead className="w-24">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persons.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="py-6 text-center">
                                                No persons found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        persons.data.map((person) => (
                                            <TableRow key={person.id}>
                                                <TableCell className="font-medium">{person.name}</TableCell>
                                                <TableCell>{person.category?.name || 'N/A'}</TableCell>
                                                <TableCell>
                                                    {person.family_id === null ? (
                                                        person.family_members_count > 0 ? (
                                                            <Badge variant="success" className="flex items-center">
                                                                <Users className="mr-1 h-3 w-3" />
                                                                Family Head ({person.family_members_count})
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline">Lives Alone</Badge>
                                                        )
                                                    ) : (
                                                        <Badge variant="outline">Family Member</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => router.visit(route('persons.show', person.id))}>
                                                                View
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => router.visit(route('persons.edit', person.id))}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this person?')) {
                                                                        router.delete(route('persons.destroy', person.id));
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Pagination className="flex w-full justify-end">
                                <PaginationContent>
                                    {persons.prev_page_url && (
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(persons.current_page - 1);
                                                }}
                                            />
                                        </PaginationItem>
                                    )}
                                    {Array.from({ length: persons.last_page }, (_, i) => i + 1)
                                        .filter((page) => page === 1 || page === persons.last_page || Math.abs(page - persons.current_page) <= 1)
                                        .map((page, idx, array) => {
                                            // Check if we need to add an ellipsis
                                            const showEllipsis = idx > 0 && array[idx - 1] !== page - 1;

                                            return (
                                                <React.Fragment key={`page-${page}`}>
                                                    {showEllipsis && (
                                                        <PaginationItem>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    )}
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href="#"
                                                            isActive={page === persons.current_page}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handlePageChange(page);
                                                            }}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </React.Fragment>
                                            );
                                        })}

                                    {persons.next_page_url && (
                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(persons.current_page + 1);
                                                }}
                                            />
                                        </PaginationItem>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
