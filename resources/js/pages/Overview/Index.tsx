import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCircle, Globe, Lock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/overview',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Overview" />

            {/* Welcome Section */}
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h1 className="mb-4 text-4xl font-bold">Welcome to EG-0!</h1>
                <p className="mb-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
                    This is your overview page — a quick introduction to help you get started. Use the menu or the button below to jump right in.
                </p>
                <Button onClick={() => (window.location.href = '/dashboard')} className="mb-12 rounded-lg px-6 py-3 text-lg">
                    Let’s Get Started
                </Button>

                {/* Separation Line */}
                <hr className="mb-12 w-full max-w-4xl border-gray-300 dark:border-gray-600" />

                {/* Service Cards */}
                <h1 className="mb-6 text-2xl font-bold">Why us?</h1>

                <div className="mb-16 grid w-full max-w-6xl gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl dark:hover:bg-white dark:hover:text-black">
                        <CardHeader className="flex flex-col items-center">
                            <Lock className="mb-2 h-9 w-10 text-blue-500" />
                            <CardTitle>Authentication</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-black">
                                Your data, your control. Secure sign-in keeps your personal information safe and accessible only to you
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl dark:hover:bg-white dark:hover:text-black">
                        <CardHeader className="flex flex-col items-center">
                            <CheckCircle className="mb-2 h-9 w-10 text-green-500" />
                            <CardTitle>Simple & Reliable</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-black">
                                A clean, clutter-free experience you can count on — so managing your life feels effortless, every time.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl dark:hover:bg-white dark:hover:text-black">
                        <CardHeader className="flex flex-col items-center">
                            <Globe className="mb-2 h-9 w-10 text-purple-500" />
                            <CardTitle>Easy Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 dark:hover:text-black">
                                Stay organized anywhere, anytime. Access your tools and information on any device with ease
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Overview Section */}
                <div className="flex w-full max-w-6xl flex-col items-center gap-8 rounded-xl bg-gray-100 p-8 shadow-lg md:flex-row dark:bg-neutral-900">
                    {/* Text */}
                    <div className="flex-1 text-left">
                        <h2 className="mb-4 text-3xl font-bold">Your Productivity Hub</h2>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            All your tasks, tools, and timelines in one place. Stay ahead of deadlines, work smarter, and keep everything organized
                            without the clutter.
                        </p>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            With EG-0, switching between light and dark mode also adjusts the dashboard’s background to match your workflow style.
                        </p>
                        <Button className="rounded-full bg-indigo-600 px-6 py-3 text-lg hover:bg-indigo-700">Learn More</Button>
                    </div>

                    {/* Image */}
                    <div className="flex flex-1 justify-center">
                        <img src="/Task.png" alt="Tasks Overview" className="h-auto max-w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
