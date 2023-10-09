"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/useBoardStore";

function Header() {
	const [searchString,setSearchString] = useBoardStore((state) => [
		state.searchString,
		state.setSearchString
	]);
	
	return (
		<header>
			<div className="flex flex-col items-center p-5 bg-gray-500/10 rounded-b-2xl md:flex-row">
				<div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50" />
				<Image
					src="https://links.papareact.com/c2cdd5"
					alt="logo"
					width={300}
					height={100}
					className="w-44 pb-10 object-contain md:w-56 md:pb-0"
				/>
				<div className="flex items-center space-x-5 flex-1 justify-end w-full">
					<form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
						<MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
						<input
							type="text"
							placeholder="Enter the search"
							className="flex-1 outline-none p-2"
							onChange={(e) => setSearchString(e.target.value)}
							value={searchString}
						/>
						<button type="submit" hidden>
							Search
						</button>
					</form>

					<Avatar name="Sai Krishna Das" round size="50" color="#0055D1" />
				</div>
			</div>
		</header>
	);
}

export default Header;
