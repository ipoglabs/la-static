
'use client'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import { useState, useEffect } from 'react'
import HomePageSkeleton from '@/components/HomePageSkeleton'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const categories = [
  {
    title: 'Property',
    desc: 'Find your perfect home, rental or commercial space.',
    icon: '/assets/icons/property.png',
    bg: 'bg-white',
    items: ['To Rent','To Buy','Room Rental','For Students','Commercial','Holiday Rental','Land for Sale/Lease','Wanted List'],
  },
  {
    title: 'Jobs',
    desc: 'Discover full-time, part-time, and freelance opportunities.',
    icon: '/assets/icons/jobs.png',
    bg: 'bg-white',
    items: ['Full Time','Part Time','Freelance','Internship','Temporary & Seasonal','Wanted'],
  },
  {
    title: 'Vehicles',
    desc: 'Buy, Sell, or rent cars, bikes and more.',
    icon: '/assets/icons/vehicles.png',
    bg: 'bg-white',
    items: ['Car','Motorcycle','Van','Truck','Parts & Accessories'],
  },
  {
    title: 'Services',
    desc: 'Skilled professionals for every need.',
    icon: '/assets/icons/services.png',
    bg: 'bg-white',
    items: ['Home Services','Business Services','Health & Fitness','Tutoring','Education & Learning','Travel & Tourism','Food & Dining','Technology & Gadgets','Other Services'],
  },
  {
    title: 'Pets',
    desc: 'Adopt, buy or find pet services near you.',
    icon: '/assets/icons/pets.png',
    bg: 'bg-white',
    items: ['For Sale','Adoption','Service','Accessories','Lost & Found'],
  },
  {
    title: 'For Sale',
    desc: 'Great deals on electronics, furniture, and more.',
    icon: '/assets/icons/forsale.png',
    bg: 'bg-white',
    items: ['Electronics','Home & Furniture','Office Supplies','Fashion & Accessories','Sports & Fitness','Toys & Games','Book, Music & Media','Baby & Kids','Health & Beauty','Garden & Outdoors','Hobbies & Collections','Miscellaneous'],
  },
  {
    title: 'Business',
    desc: 'Promote, buy or sell businesses and franchises.',
    icon: '/assets/icons/industry.png',
    bg: 'bg-white',
    items: ['Business for Sale/Lease','B2B Service','Freelance / Contractors','Partnership Opportunities','Equipment and Supplies','Start-up Support','Training Opportunities','Franchise Opportunities','Business Events','Financial Services','Miscellaneous'],
  },
  {
    title: 'Community & Events',
    desc: 'Connect through local events and activities.',
    icon: '/assets/icons/community.png',
    bg: 'bg-white',
    items: ['Lost & Found','Events','Classes','Volunteering & Charity','Classes & Courses','Announcement','Child & Family Activities','General / Other'],
  },
  {
    title: 'Special Offers',
    desc: 'Exclusive deals, discounts, and limited-time offers.',
    icon: '/assets/icons/special_offer.png',
    bg: 'bg-white',
    items: ['Banking & Financial Deals','Travel & Tourism','Retail & Shopping','Food & Dining','Electronics & Gadgets','Health & Wellness','Education & Learning','Holiday & Seasonal Offers','Entertainment','Home & Living','Automotive','Miscellaneous'],
  },
]

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-slate-400">
    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)
const ChevronDownIcon = () => (
  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 group-open:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-slate-500">
      <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
    </svg>
  </div>
)

const ChevronUpIcon = () => (
  <div className="hidden items-center justify-center w-9 h-9 rounded-full bg-slate-100 group-open:flex">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-slate-500">
      <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
    </svg>
  </div>
)
export default function HomePage() {
  // ─── 1. Loading state declared at the top of the component ───
  const [isLoading, setIsLoading] = useState(true);

  // ─── 2. Timer to simulate data fetch — swap setTimeout for your
  //        real data-fetching logic (e.g. resolve when SWR/React Query
  //        returns data) and call setIsLoading(false) when done ───
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4800);
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  // ─── 3. Early return: render skeleton until data is ready ───
  if (isLoading) return <HomePageSkeleton />;


  return (
    <div className="bg-slate-950/15">
      <Header />
      <SearchBar />
{/* Category Grid */}
<div className="container mx-auto px-2 py-4 columns-1 sm:columns-2 md:columns-3 gap-4 max-w-screen-lg">
  {categories.map((cat) => (
    <details key={cat.title} className="group cursor-pointer break-inside-avoid mb-4 w-full">
      <summary className={`cursor-pointer list-none relative overflow-hidden rounded-lg group-open:rounded-b-none ${cat.bg} px-2 pt-3 pb-3 min-h-[50px] flex items-center border border-slate-300 shadow-sm`}>

        {/* 3D Icon — left side */}
        <Image
          src={cat.icon}
          alt={cat.title}
          width={72}
          height={72}
          className="flex-none mr-2 relative z-10 size-20 object-contain  border border-red-300"
        />

        {/* Title & desc — middle, grows */}
        <div className="relative z-10 flex-1 pr-10">
          <h2 className="text-xl font-bold text-slate-700">{cat.title}</h2>
          <p className="text-base text-slate-600">{cat.desc}</p>
        </div>

        {/* Chevron — right corner */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <ChevronDownIcon />
          <ChevronUpIcon />
        </div>

      </summary>

      <ul className="bg-white rounded-lg border border-slate-400 divide-y divide-dashed divide-slate-300 p-1 group-open:rounded-t-none -mt-1">
        {cat.items.map((item) => (
          <li key={item}>
            <Link
              href="/listing"
              className="flex items-center justify-between pl-5 pr-2 py-1 text-slate-900 hover:font-semibold hover:text-emerald-800 hover:bg-emerald-100 rounded-md"
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

      {/* Stats Section */}
      <div className="bg-slate-300 py-5 border-2 border-t border-slate-400">
        <div className="container mx-auto max-w-screen-lg grid grid-cols-2 md:grid-cols-4 gap-4 px-4">

          <div className="rounded-[25px] bg-white px-7 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-11 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <h2 className="text-3xl font-bold"><span>128</span> +</h2>
            <p className="font-sans text-base font-medium text-gray-500">Super Categories</p>
          </div>

          <div className="rounded-[25px] bg-white px-7 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-11 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
            </svg>
            <h2 className="text-3xl font-bold"><span>2680</span> +</h2>
            <p className="font-sans text-base font-medium text-gray-500">User Clicks Daily</p>
          </div>

          <div className="rounded-[25px] bg-white px-7 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-11 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <h2 className="text-3xl font-bold"><span>100</span> +</h2>
            <p className="font-sans text-base font-medium text-gray-500">Avg Onboarding</p>
          </div>

          <div className="rounded-[25px] bg-white px-7 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-11 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <h2 className="text-3xl font-bold"><span>268M</span> +</h2>
            <p className="font-sans text-base font-medium text-gray-500">User Search</p>
          </div>

        </div>
      </div>
<Footer />
    </div>
  )
}