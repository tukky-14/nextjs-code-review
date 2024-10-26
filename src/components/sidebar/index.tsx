import { FC } from 'react';

interface sidebarProps {
    files: File[];
    onDelete: (fileName: string) => void;
}

const Sidebar: FC<sidebarProps> = ({ files, onDelete }) => {
    return (
        <aside className="w-1/4 bg-gray-800 p-4 text-white">
            <h2 className="mb-4 text-lg font-bold text-white">Uploaded Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.name} className="mb-2 flex items-center justify-between">
                        <span>{file.name}</span>
                        <button onClick={() => onDelete(file.name)} className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
