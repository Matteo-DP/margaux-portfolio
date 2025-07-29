import React, { useContext } from "react"
import Link from "next/link";
import { CollectionsContext } from "@/pages/_app";

// prop: /api/getCollections response object
export default function WorksListSection() {
    const collections = useContext(CollectionsContext);

    const containerClass =
        collections.length < 3
            ? "flex justify-evenly gap-6"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";

    return (
        <div className={containerClass}>
            {collections.map((item) =>
                item.hidden ? null :
                <CollectionLink item={item} key={item.id} />
            )}
        </div>
    );
}

// prop: collection item to show
const CollectionLink = ({ item }) => {
    return (
        <div className='text-xl text-zinc-800 tracking-wider hover:text-red-400 transition-colors duration-300 font-quicksand'>
            <Link href={`/collection/${item.handle}`} key={item.id}>
                <div className="p-4">
                    &gt; {item.name}
                </div>
            </Link>
        </div>
    )
}