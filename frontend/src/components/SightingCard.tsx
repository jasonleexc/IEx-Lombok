import { useState } from "react";
import { SightingRequest } from "../types/sighting"


type Props = {
    onSubmit: (payload: SightingRequest) => Promise<void> | void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export default function SightingForm({ onSubmit, onCancel, isSubmitting = false}: Props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload: SightingRequest = {
            author, title, content
        };
        await onSubmit(payload);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                    Author
                </label>
                <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}