import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { api } from '~/utils/api';
import { signIn } from "next-auth/react";

const GeneratePage: NextPage = () => {
    const { data: sessionData } = useSession();
    const [prompt, setPrompt] = useState("");
    const generateIcon = api.generate.generateIcon.useMutation();

    const handleSubmitGenerate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;
        if (!sessionData) return signIn();
        generateIcon.mutate({ prompt });
        setPrompt("");

    }

    return (
        <>
            <Head>
                <title>Icon Generator</title>
                <meta name="description" content="Image Generator" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="container mx-auto py-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Generate Custom Icons</h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Enter a prompt and well generate a unique icon for you.
                        </p>
                    </div>
                    <form onSubmit={(e) => void handleSubmitGenerate(e)} className="flex flex-col gap-4 w-full max-w-md">
                        <Input
                            type="text"
                            placeholder="Enter a prompt"
                            value={prompt}
                            required
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        {generateIcon.error && (
                            <p className="text-red-500">{generateIcon.error.message}</p>
                        )}
                        <Button type="submit" disabled={generateIcon.isLoading}>
                            {generateIcon.isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="h-5 w-5 mr-2" />
                                    Generating...
                                </div>
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </form>
                    {generateIcon.isLoading ? (
                        <div className="w-full max-w-md">
                            <div className="flex items-center justify-center bg-muted rounded-lg h-[400px] animate-pulse">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {!generateIcon.isLoading && generateIcon.data?.url && (
                        <div className="w-full max-w-md">
                            <Image
                                src={generateIcon.data.url}
                                alt="Generated Icon"
                                width={500}
                                height={400}
                                className="object-cover "
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default GeneratePage
