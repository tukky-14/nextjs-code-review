'use client';

import { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Main from '../components/main';
import Footer from '../components/footer';

const Home = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const handleDelete = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar files={files} onDelete={handleDelete} />
                <Main files={files} onDrop={handleDrop} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
