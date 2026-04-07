import Link from 'next/link'

export default function SearchBar() {
  return (
    <div className="bg-slate-800 pt-4 pb-1 shadow-lg">
      <div className="container max-w-screen-sm mx-auto px-4 text-center pb-4">
        <h1 className="text-white text-2xl sm:text-4xl font-bold mb-3">
          You can find anything with lokalads, just start...
        </h1>
        <h3 className="text-slate-300">Search from 3.2M posts</h3>
      </div>

      <form className="container mx-auto px-4 flex flex-col sm:flex-row gap-2 max-w-screen-lg">
        <input
          className="w-full h-[40px] px-3 rounded-md"
          placeholder="What are you looking for?"
        />

        <input
          className="w-full h-[40px] px-3 rounded-md"
          placeholder="Enter location..."
        />

        <button className="bg-rose-500 text-white px-6 rounded-md">
          Search
        </button>
      </form>

      <div className="container mx-auto px-4 pt-2 pb-1 max-w-screen-lg text-right">
        <Link href="#" className="text-white text-sm">
          Create Alert
        </Link>
      </div>
    </div>
  )
}