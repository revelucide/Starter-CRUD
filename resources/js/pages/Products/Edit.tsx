'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Edit({ open, onOpenChange, product, image_url }: any) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        picture: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load product data when modal opens
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
                description: product.description || '',
                picture: null,
            });
            setPreview(image_url || null);
            setErrors({});
        }
    }, [product, image_url]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, picture: file });

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        router.post(
            `/products/${product.id}`,
            {
                _method: 'put',
                ...formData,
            },
            {
                forceFormData: true,
                onError: (err) => setErrors(err),
                onSuccess: () => onOpenChange(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-inside list-disc">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {preview && (
                        <div className="space-y-2">
                            <Label>Current Image</Label>
                            <img src={preview} alt="Preview" className="h-32 w-32 rounded object-cover" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="product-picture">Upload New Image</Label>
                        <Input id="product-picture" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-name">Name *</Label>
                        <Input
                            id="product-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Product Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-price">Price *</Label>
                        <Input
                            id="product-price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Price"
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-description">Description</Label>
                        <Textarea
                            id="product-description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description"
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Update Product
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
