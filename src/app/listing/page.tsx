import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

const listings = [
  {
    id: 1,
    img: "/assets/img/img6.jpg",
    price: "$4,500",
    unit: "pcm",
    title:
      "Beautiful 5 Bed Room Villa Home in the countryside, 3 mins walk to station.",
    meta: "3 beds · 2 baths · Apartment",
    location: "Dartford, Kent",
    ago: "2d ago",
    count: "1/18",
  },
  {
    id: 2,
    img: "/assets/img/img5.jpg",
    price: "$2,200",
    unit: "pcm",
    title:
      "Modern 2 Bedroom Flat in Central London, fully furnished.",
    meta: "2 beds · 1 bath · Flat",
    location: "London",
    ago: "3d ago",
    count: "1/12",
  },
  {
    id: 3,
    img: "/assets/img/img4.jpg",
    price: "$3,100",
    unit: "pcm",
    title:
      "Spacious 3 Bedroom House with large garden.",
    meta: "3 beds · 2 baths · House",
    location: "Bristol",
    ago: "1d ago",
    count: "1/9",
  },
];

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="size-4 inline text-slate-500 mr-1"
  >
    <path
      fillRule="evenodd"
      d="M8 0a5 5 0 0 0-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ListingPage() {
  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="bg-white shadow p-4 text-xl font-semibold">
        Listings
      </div>

      {/* Listings Grid */}
      <div className="container mx-auto p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">

        {listings.map((item) => (
          <Link
            key={item.id}
            href="/post"
            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-slate-200"
          >

            {/* Image */}
            <div className="relative">
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {item.count}
              </span>

              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-3">

              {/* Price + Favorite */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg text-gray-800">
                  {item.price}
                  <span className="text-sm text-gray-500 ml-1">
                    {item.unit}
                  </span>
                </div>

                {/* ✅ Client Component */}
                <FavoriteButton />
              </div>

              {/* Title */}
              <h3 className="text-sm mt-1 line-clamp-2">
                {item.title}
              </h3>

              {/* Meta */}
              <div className="text-xs text-gray-500 mt-1">
                {item.meta}
              </div>

              {/* Location */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                <span>
                  <LocationIcon />
                  {item.location}
                </span>
                <span>{item.ago}</span>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}