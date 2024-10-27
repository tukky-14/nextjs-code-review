import { useDropzone } from 'react-dropzone';
import { FC, useState } from 'react';

interface mainProps {
    files: File[];
    onDrop: (acceptedFiles: File[]) => void;
}

const Main: FC<mainProps> = ({ files, onDrop }) => {
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
    });
    const [reviewResult, setReviewResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchReview = async () => {
        if (files.length === 0) {
            setReviewResult('ファイルが選択されていません');
            return;
        }

        setLoading(true);
        try {
            // ファイル内容を連結してプロンプトを作成
            const fileContents = await Promise.all(
                files.map(async (file) => {
                    const text = await file.text();
                    return text;
                })
            );
            const prompt = fileContents.join('');
            // ファイル情報を連結してプロンプトを作成
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the review');
            }
            const data = await response.json();
            setReviewResult(data.review);
        } catch (error) {
            console.error('Error:', error);
            setReviewResult('An error occurred while fetching the review');
        } finally {
            setLoading(false);
        }
    };

    const clearReview = () => {
        setReviewResult(null);
    };

    return (
        <main className="max-h-screen flex-1 overflow-scroll p-4">
            <div {...getRootProps({ className: 'border-2 border-dashed border-gray-400 p-8 text-center' })}>
                <input {...getInputProps()} />
                <p>ファイルをドラッグ&ドロップするか、選択してください。</p>
                <button
                    type="button"
                    onClick={open}
                    className="mt-2 rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                >
                    ファイルの選択
                </button>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={fetchReview}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                    レビュー
                </button>
                <button onClick={clearReview} className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700">
                    クリア
                </button>
            </div>
            {reviewResult && (
                <div className="mt-4 rounded border bg-gray-800 p-4 text-white">
                    <h2 className="mb-2 text-lg font-bold text-white">【コードレビュー結果】</h2>
                    <pre className="whitespace-pre-wrap">{reviewResult}</pre>
                </div>
            )}
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-xl font-bold text-white">Loading...</div>
                </div>
            )}
        </main>
    );
};

export default Main;
