import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    title: 'Property',
    desc: 'Find your perfect home, rental or commercial space.',
    items: ['To Rent', 'To Buy', 'Room Rental', 'For Students', 'Commercial', 'Holiday Rental', 'Land for Sale/Lease', 'Wanted List'],
  },
  {
    title: 'Jobs',
    desc: 'Discover full-time, part-time, and freelance opportunities.',
    items: ['Full Time', 'Part Time', 'Freelance', 'Internship', 'Temporary & Seasonal', 'Wanted'],
  },
  {
    title: 'Vehicles',
    desc: 'Buy, sell, or rent cars, bikes and more.',
    items: ['Car', 'Motorbike & Scooter', 'Van & Minibus', 'Motorhome & Campervan', 'Truck & HGV', 'Tractor & Farm', 'Boat & Watercraft', 'Parts & Accessories', 'Wanted'],
  },
  {
    title: 'For Sale',
    desc: 'Explore a wide range of items for sale near you.',
    items: ['Phones & Tablets', 'Computers & IT', 'TV & Audio', 'Cameras', 'Gaming', 'Furniture', 'Clothes & Accessories', 'Baby & Kids', 'Sports & Leisure', 'Garden & Outdoors', 'Tools & DIY', 'Musical Instruments', 'Art & Antiques', 'Books, Films & Music', 'Food & Drink', 'Other'],
  },
  {
    title: 'Services',
    desc: 'Find local professionals for any task.',
    items: ['Builder & Tradespeople', 'Cleaning & Domestic', 'Computing & IT', 'Financial & Legal', 'Health & Beauty', 'Lessons & Classes', 'Pet Services', 'Removal & Storage', 'Weddings', 'Other'],
  },
  {
    title: 'Community',
    desc: 'Connect with people and events around you.',
    items: ['Events', 'Lost & Found', 'Announcements', 'Volunteering', 'Classes & Lessons', 'Rideshare & Carpooling', 'Other'],
  },
  {
    title: 'Animals & Pets',
    desc: 'Find your perfect furry friend or rehome pets.',
    items: ['Dogs', 'Cats', 'Birds', 'Fish', 'Horses', 'Small Animals', 'Reptiles', 'Livestock', 'Other'],
  },
  {
    title: 'Business & Industrial',
    desc: 'Everything for your business needs.',
    items: ['Office Furniture', 'Industrial Equipment', 'Retail & Catering', 'Agriculture', 'Construction', 'Other'],
  },
  {
    title: 'Holiday & Travel',
    desc: 'Explore deals on holidays and travel.',
    items: ['Holiday Packages', 'Accommodation', 'Car Hire', 'Flights', 'Cruises', 'Other'],
  },
]

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-slate-400">
    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block size-5 group-open:hidden">
    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden size-5 group-open:inline-block">
    <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
  </svg>
)

export default function HomePage() {
  return (
    <div className="bg-slate-950/15">
      {/* Header */}
      <header className="border-b border-slate-200 shadow-md shadow-gray-300">
        {/* Main App Header */}
        <div className="bg-white">
          <div className="container mx-auto h-16 flex items-center px-4 max-w-screen-lg">
            <Link className="flex gap-2 items-center" href="/">
              <Image className="size-10" src="/assets/la-logo-symbol-color.svg" alt="logo" width={40} height={40} />
              <div className="relative">
                <Image className="w-24 max-sm:hidden" src="/assets/la-text-black.svg" alt="logo" width={96} height={32} />
              </div>
            </Link>

            <div className="flex-1"></div>

            <div className="h-full flex items-center gap-2">
              <button className="hover:bg-slate-300 flex items-center justify-center flex-none w-11 max-sm:w-9 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>

              <Link href="#" className="size-7 bg-rose-500 hover:bg-rose-600 flex items-center justify-center rounded-full text-white text-sm font-medium mr-2 sm:hidden">
                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
              </Link>

              <Link href="#" className="bg-rose-500 hover:bg-rose-600 group flex items-center rounded-full text-white text-sm font-medium pl-2 pr-3 py-1 shadow-sm max-sm:hidden mr-2">
                <svg width="20" height="20" fill="currentColor" className="max-sm:mr-1" aria-hidden="true">
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                POST
              </Link>

              <button className="hover:bg-slate-300 flex items-center justify-center flex-none w-11 max-sm:w-9 h-full">
                <div className="relative size-10 bg-indigo-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Search Area */}
        <div className="bg-slate-800 pt-4 pb-1 shadow-gray-200 shadow-lg">
          {/* Hero Text */}
          <div className="container max-w-screen-sm mx-auto px-4 text-center pb-4">
            <h1 className="text-white text-2xl sm:text-4xl leading-tight font-bold mb-3">You can find anything with lokalads, just start...</h1>
            <h3 className="text-slate-300">Search from 3.2M posts</h3>
          </div>

          {/* Search Form */}
          <form className="container mx-auto px-4 flex-1 relative w-full flex flex-col flex-nowrap sm:flex-row gap-2 max-w-screen-lg">
            {/* Keyword */}
            <div className="relative flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 absolute left-2 top-[20px] -mt-3 text-slate-500 pointer-events-none">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
              <input
                className="appearance-none w-full h-[40px] py-2 pl-9 pr-3 focus:outline-none rounded-md bg-white text-sm text-slate-900 placeholder:text-slate-500"
                type="text"
                placeholder="What are you looking for?"
              />
            </div>

            {/* Location */}
            <div className="flex-1 flex flex-row flex-nowrap items-center gap-0">
              <div className="relative flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 absolute left-2 top-[20px] -mt-3 text-slate-500 pointer-events-none">
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
                <input
                  className="appearance-none w-full h-[40px] py-2 pl-9 pr-3 focus:outline-none rounded-l-md bg-white text-sm text-slate-900 placeholder:text-slate-500"
                  type="text"
                  placeholder="Enter location..."
                />
              </div>
              <button className="relative appearance-none flex items-center rounded-r-md border-l border-slate-300 bg-slate-200 hover:bg-slate-300 h-[40px] pl-4 pr-6">
                <span className="text-sm font-semibold text-slate-900">+ 0 miles</span>
                <svg className="absolute top-3 right-1 w-4 h-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                </svg>
              </button>
            </div>

            {/* Search button */}
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 h-[40px] rounded-md text-sm">
              Search
            </button>
          </form>

          {/* Advanced search link */}
          <div className="relative container mx-auto flex justify-end px-4 pt-2 pb-1 max-w-screen-lg">
            <Link href="#" className="group flex items-center gap-2 text-slate-100 text-sm font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-slate-300 rotate-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
              <span className="max-sm:hidden">Create Alert</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body - Category Masonry */}
      <div className="container mx-auto px-4 py-6 columns-1 sm:columns-2 md:columns-3 gap-x-5 max-w-screen-lg">
        {categories.map((cat) => (
          <details key={cat.title} className="break-inside-avoid group cursor-pointer mb-4">
            <summary className="cursor-pointer flex flex-row items-center justify-between pl-3 pt-2 pb-3 bg-white group-open:bg-slate-50 border border-slate-400 shadow-sm rounded-lg group-open:rounded-b-none min-h-[90px]">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-700">{cat.title}</h2>
                <p className="text-sm font-normal">{cat.desc}</p>
              </div>
              <div className="flex-none mr-3">
                <ChevronDownIcon />
                <ChevronUpIcon />
              </div>
            </summary>

            <ul className="bg-white rounded-lg border border-slate-400 divide-y divide-dashed divide-slate-300 p-1 group-open:rounded-t-none -mt-1">
              {cat.items.map((item) => (
                <li key={item} className="block">
                  <Link
                    href="/listing"
                    className="flex items-center justify-between pl-5 pr-2 py-1 font-normal text-slate-900 hover:font-semibold hover:text-emerald-800 hover:bg-emerald-100 rounded-md cursor-pointer"
                  >
                    <span>{item}</span>
                    <ChevronRightIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  )
}