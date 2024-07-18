import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { api } from '~/utils/api';

const GeneratePage: NextPage = () => {
    const [prompt, setPrompt] = useState("");
    const { mutate } = api.generate.generateIcon.useMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ prompt }, {
            onSuccess: (data) => {
                console.log("mutaion success", data);
            },
        });
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
            </main>
        </>
    )
}

export default GeneratePage
