import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: '',
        description: '',
        picture: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            forceFormData: true, // Needed for file uploads
            onSuccess: () => {
                reset(); // Clear form after successful submission
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Display Error */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                <ul className="list-inside list-disc">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="gap-1.5">
                        <Label htmlFor="product-name">Name</Label>
                        <Input
                            id="product-name"
                            placeholder="Product Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="product-price">Price</Label>
                        <Input
                            id="product-price"
                            type="number"
                            step="0.01"
                            placeholder="Price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="product-description">Description</Label>
                        <Textarea
                            id="product-description"
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="product-picture">Picture</Label>
                        <Input id="product-picture" type="file" accept="image/*" onChange={(e) => setData('picture', e.target.files?.[0] || null)} />
                    </div>

                    <Button disabled={processing} type="submit" className="w-full">
                        {processing ? 'Saving...' : 'Add Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
