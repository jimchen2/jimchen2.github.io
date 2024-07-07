import Image from "next/image";
import Link from "next/link";
import { Link as LinkType } from "./types";

interface LinkTreeProps {
  links: LinkType[];
}

export default function LinkTree({ links }: LinkTreeProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Jim Chen's LinkTree</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(
          links.reduce((acc, link) => {
            if (!acc[link.category]) acc[link.category] = [];
            acc[link.category].push(link);
            return acc;
          }, {} as Record<string, LinkType[]>)
        ).map(([category, categoryLinks]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            {categoryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/${link.icon}`}
                  alt={link.name}
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
