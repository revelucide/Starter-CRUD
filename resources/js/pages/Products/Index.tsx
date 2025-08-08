import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { useState } from 'react';
import Create from './Create';
import Edit from './Edit';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Products', href: '/products' }];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
}

interface PageProps {
    flash: { message?: string };
    products: Product[];
}

export default function Index() {
    const { products, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id}. ${name}`)) {
            destroy(route('products.destroy', id));
        }
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            {/* Create Product Button */}
            <div className="m-4">
                <Button onClick={() => setOpenCreate(true)}>Create a Product</Button>
            </div>

            {/* Notification Alert */}
            {flash.message && (
                <div className="m-4">
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {/* Products Table */}
            {products.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>
                                        {product.image ? (
                                            <img src={`/storage/${product.image}`} alt={product.name} className="h-12 w-12 rounded object-cover" />
                                        ) : (
                                            <span className="text-gray-400 italic">No image</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Button className="bg-slate-600 hover:bg-slate-700" onClick={() => handleEditClick(product)}>
                                            Edit
                                        </Button>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="bg-red-500 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Edit Modal */}
            {selectedProduct && (
                <Edit
                    open={openEdit}
                    onOpenChange={setOpenEdit}
                    product={selectedProduct}
                    image_url={selectedProduct.image ? `/storage/${selectedProduct.image}` : null}
                />
            )}

            {/* Create Modal */}
            <Create open={openCreate} onOpenChange={setOpenCreate} />
        </AppLayout>
    );
}
