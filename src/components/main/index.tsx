import { useDropzone } from 'react-dropzone';
import { FC, useState } from 'react';

interface mainProps {
    onDrop: (acceptedFiles: File[]) => void;
}

const Main: FC<mainProps> = ({ onDrop }) => {
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
    });
    const [reviewResult, setReviewResult] = useState<string | null>(null);

    const fetchReview = async () => {
        // Call Gemini API (Reference: https://zenn.dev/bbsfish/articles/26039788de5815)
        try {
            const response = await fetch('/api/gemini-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ files: [] }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch the review');
            }
            const data = await response.json();
            setReviewResult(data.review);
        } catch (error) {
            console.error('Error:', error);
            setReviewResult('An error occurred while fetching the review');
        }
    };

    return (
        <main className="flex-1 p-4">
            <div {...getRootProps({ className: 'border-2 border-dashed border-gray-400 p-8 text-center' })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
                <button
                    type="button"
                    onClick={open}
                    className="mt-2 rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                >
                    Select Files
                </button>
            </div>
            <button onClick={fetchReview} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                Get Review
            </button>
            {reviewResult && (
                <div className="mt-4 rounded border bg-gray-800 p-4 text-white">
                    <h2 className="mb-2 text-lg font-bold text-white">Code Review Result</h2>
                    <pre>{reviewResult}</pre>
                </div>
            )}
        </main>
    );
};

export default Main;
