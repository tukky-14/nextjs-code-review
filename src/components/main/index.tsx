import { useDropzone } from 'react-dropzone';
import { FC } from 'react';

interface MainProps {
    onDrop: (acceptedFiles: File[]) => void;
}

const Main: FC<MainProps> = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <main className="flex-1 p-4">
            <div {...getRootProps({ className: 'border-2 border-dashed border-gray-400 p-8 text-center' })}>
                <input {...getInputProps()} />
                <p>{"Drag 'n' drop some files here, or click to select files"}</p>
            </div>
        </main>
    );
};

export default Main;
