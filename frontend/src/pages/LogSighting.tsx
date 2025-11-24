// details to be included in a sighting: author, title, content, datePosted
// turtle species, location, carapace length, activity observed 
// photo upload option (to be implemented later)

const LogSighting: React.FC<{ 
    NewSighting: string, 
    SetNewSighting: (value: string) => void, // SetNewSighting takes in a single string from NewSighting
    handleAddSighting: (e: React.FormEvent<HTMLFormElement>) => void
}> = ({ NewSighting, SetNewSighting, handleAddSighting }) => {
    return (
        <form className="LogSightingForm" onSubmit={handleAddSighting}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Log Sighting">
                    Log Your Own Sighting!
                </label>
                <input
                    id="Sighting"
                    name="Sighting"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Describe your sighting..."
                    value={NewSighting}
                    onChange={(e) => SetNewSighting(e.target.value)}
                />  
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
                Enter
            </button>
        </form>
    )

}

export default LogSighting;