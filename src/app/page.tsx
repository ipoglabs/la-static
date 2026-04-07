import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'

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
      <SearchBar />
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