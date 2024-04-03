"use client";

import { useStore } from "@hooks/use-store";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const Search = () => {
  const { query, setQuery } = useStore();
  const { data, error, isLoading } = useSWR<
    {
      name: string;
      npm: string;
      faculty: string;
      major: string;
      program: string;
    }[]
  >(`/api/profiles?q=${query}`, () => {
    if (query?.length < 3) return Promise.resolve([]);
    return fetcher(`/api/profiles?q=${query}`);
  });
  const renderResult = () => {
    if (error)
      return <p className="text-sm text-gray-500">Error: {error.message}</p>;
    if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;
    if (query?.length < 3)
      return (
        <p className="text-sm text-gray-500">Masukkan minimal 3 karakter</p>
      );
    if (data?.length === 0) return <p>Tidak ada hasil</p>;
    if (data)
      return (
        <div className="flex flex-col gap-4">
          {data.map((profile) => (
            <Link
              href={`/profile/${profile.npm}`}
              className="border p-4 hover:bg-gray-100 rounded-lg"
              key={`${profile.npm}-${profile.program}`}
            >
              <h2 className="font-bold text-lg">
                {profile.name}
                <span className="font-normal">
                  {" - "}
                  {profile.npm}
                </span>
              </h2>
              <p>
                {profile.faculty} - {profile.major} - {profile.program}
              </p>
            </Link>
          ))}
        </div>
      );
    return null;
  };

  return (
    <>
      <label className="input input-bordered w-full flex items-center gap-2">
        <input
          type="text"
          placeholder="Masukin nama atau NPM..."
          className="grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <MagnifyingGlassIcon className="h-5 w-5" />
      </label>
      {renderResult()}
    </>
  );
};

export default Search;
