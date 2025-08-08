'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React, { useState } from 'react';

export default function Edit({ product, image_url }: any) {
    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        picture: null,
    });

    const [preview, setPreview] = useState<string | null>(image_url);
    const [errors, setErrors] = useState<Record<string, string>>({});

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
            },
        );
    };

    return (
        <div className="mx-auto w-8/12 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Display Errors */}
                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-4">
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

                {/* Current Image Preview */}
                {preview && (
                    <div className="space-y-2">
                        <Label>Current Image</Label>
                        <img src={preview} alt="Preview" className="h-40 w-40 rounded object-cover" />
                    </div>
                )}

                {/* Picture Upload */}
                <div className="space-y-2">
                    <Label htmlFor="product-picture">Upload New Image</Label>
                    <Input id="product-picture" type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                {/* Name */}
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

                {/* Price */}
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

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                        id="product-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description"
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Update Product
                </Button>
            </form>
        </div>
    );
}
