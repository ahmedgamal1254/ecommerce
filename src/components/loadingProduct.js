const LoadingProduct= () => {
    return (

    <div className="mx-auto w-[335px] max-w-sm rounded-md border border-gray-200 p-4 shadow">
        <div className="flex animate-pulse flex-col space-y-4">
            <div className="h-48 w-full rounded-md bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="space-y-2">
            <div className="h-2 w-full rounded bg-gray-200"></div>
            <div className="h-2 w-5/6 rounded bg-gray-200"></div>
            <div className="h-2 w-4/6 rounded bg-gray-200"></div>
            </div>
            <div className="h-10 w-full rounded-md bg-gray-200"></div>
        </div>
    </div>
    )
}

export default LoadingProduct;