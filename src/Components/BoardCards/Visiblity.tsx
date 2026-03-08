function Visiblity() {
    return ( 
    <div className="space-y-4">
            <details className="group relative overflow-hidden rounded border border-gray-300 shadow-sm">
                <summary className="flex items-center justify-between gap-2 p-3 text-gray-700 transition-colors hover:text-gray-900 [&amp;::-webkit-details-marker]:hidden">
                <span className="text-sm font-medium">Visiblity</span>

                <span className="transition-transform group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>
                </span>
                </summary>

                <div className="divide-y divide-gray-300 border-t border-gray-300 bg-white">
                <fieldset className="p-3">
                    <legend className="sr-only">Checkboxes</legend>

                    <div className="flex flex-col items-start gap-3">
                    <label htmlFor="Option1" className="inline-flex items-center gap-3">
                        <input type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" id="Option1" />

                        <span className="text-sm font-medium text-gray-700"> Public </span>
                    </label>

                    <label htmlFor="Option2" className="inline-flex items-center gap-3">
                        <input type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" id="Option2" />

                        <span className="text-sm font-medium text-gray-700"> Private </span>
                    </label>

                    <label htmlFor="Option3" className="inline-flex items-center gap-3">
                        <input type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" id="Option3" />

                        <span className="text-sm font-medium text-gray-700"> WorkSpace </span>
                    </label>
                    </div>
                </fieldset>
                </div>
            </details>
        </div>
     );
}

export default Visiblity;