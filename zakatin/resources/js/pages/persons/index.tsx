import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Persons',
        href: '/persons',
    },
];

export default function Persons() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Persons" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <p>Persons</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-full">Name</TableHead>
                            <TableHead className="w-full">Email</TableHead>
                            <TableHead className="w-full">Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">John Doe</TableCell>
                            <TableCell className="font-medium">lF7fV@example.com</TableCell>
                            <TableCell className="font-medium">+1234567890</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
