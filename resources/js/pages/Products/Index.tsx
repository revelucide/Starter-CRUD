import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
        if (confirm(`Do you want to delete product - ${id}. ${name}?`)) {
            destroy(route('products.destroy', id));
        }
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    const formatPrice = (price: number) => {
        return <span className="font-semibold text-green-600">₱{price.toLocaleString()}</span>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            {/* Create Product Button */}
            <div className="m-4 flex justify-end">
                <Button onClick={() => setOpenCreate(true)} className="bg-blue-600 text-white hover:bg-blue-700">
                    + Create Product
                </Button>
            </div>

            {/* Notification Alert */}
            {flash.message && (
                <div className="m-4">
                    <Alert className="border border-gray-500 bg-gray-50 dark:border-gray-700 dark:bg-gray-950">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {/* Products Card Grid */}
            {products.length > 0 ? (
                <div className="m-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-black"
                        >
                            {/* Product Image */}
                            {product.image ? (
                                <img src={`/storage/${product.image}`} alt={product.name} className="h-48 w-full object-cover" />
                            ) : (
                                <div className="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500 italic dark:bg-gray-800">
                                    No image
                                </div>
                            )}

                            {/* Product Info */}
                            <div className="flex flex-grow flex-col p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
                                <p className="flex-grow text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                                <div className="mt-2">{formatPrice(product.price)}</div>

                                {/* Actions */}
                                <div className="mt-4 flex gap-2">
                                    <Button className="flex-1 bg-slate-600 text-white hover:bg-slate-700" onClick={() => handleEditClick(product)}>
                                        Edit
                                    </Button>
                                    <Button
                                        className="flex-1 bg-red-500 text-white hover:bg-red-600"
                                        disabled={processing}
                                        onClick={() => handleDelete(product.id, product.name)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="m-4 text-gray-500 dark:text-gray-400">No products found.</p>
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
