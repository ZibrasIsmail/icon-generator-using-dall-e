import Link from "next/link";

export default function Hero() {
    return <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Create Stunning Image</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our image generator makes it easy to create beautiful, customizable image for your projects.
                </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                    href="/generate"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Get Started
                </Link>
                <Link
                    href="/gallery"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    View Gallery
                </Link>
            </div>
        </div>
    </section>
}