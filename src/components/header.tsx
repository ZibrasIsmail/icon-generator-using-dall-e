import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import useBuyCredits from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";
import { useRouter } from 'next/router';

export default function Header() {
    const { data: sessionData } = useSession();
    const { buyCredits } = useBuyCredits();
    const { data: credits } = api.generate.getUserCredits.useQuery(undefined, {
        enabled: sessionData?.user !== undefined,
    });
    const router = useRouter();
    return (
        <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-background border-b">
            <Link href="/" className="mr-6 flex items-center" prefetch={false}>
                <MountainIcon className="h-6 w-6 text-primary" />
                <span className="sr-only">Icon Generator</span>
            </Link>
            <nav className="ml-auto flex items-center gap-2 md:gap-6">
                {/* <Link
                    href="/gallery"
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Gallery
                </Link> */}
                <Link
                    href="/generate"
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                >
                    Generate
                </Link>

                {sessionData && <button
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => {
                        void buyCredits();
                    }}
                >
                    <span className="flex items-center">
                        Buy Credits
                        {router.pathname === '/generate' && (
                            <span className="text-xs text-muted-foreground font-bold tracking-tighter ml-1">({credits})</span>
                        )}
                    </span>
                </button>
                }
                <button
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                    {sessionData ? "Sign out" : "Sign in"}
                </button>
            </nav>
        </header>
    )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
