import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { api } from '~/utils/api';

const GeneratePage: NextPage = () => {
    const [prompt, setPrompt] = useState("");
    const { mutate, error, data } = api.generate.generateIcon.useMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ prompt });
        setPrompt("");
    }
    return (
        <>
            <Head>
                <title>Icon Generator</title>
                <meta name="description" content="Icon Generator" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center justify-center gap-4">
                <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
                    <label>Prompt</label>
                    <input type="text" id="prompt" placeholder="Enter your prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    <button type="submit">Generate</button>
                </form>
                {error && <p className='text-red-500 bg-red-100 p-2 rounded-md'>{error.message}</p>}
                {data && data?.image && (
                    <div className='group relative aspect-square w-[300px] mb-2 rounded-md'>
                        <Image
                            src={data?.image}
                            alt="generated icon"
                            className="object-cover transform group-hover:scale-110 transition-transform duration-500 rounded-md"
                            priority
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
            </main>
        </>
    )
}

export default GeneratePage
