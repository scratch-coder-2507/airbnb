import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
function Header({placeholder}) {
    const [show, handleShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    const resetInput = () => {
        setSearchInput("");
    }

    const transitionHeader = () => {
        if(window.scrollY > 100 ) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionHeader);
        return () => window.removeEventListener("scroll", transitionHeader);
    },[]);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const [searchInput, setSearchInput] = useState('');

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            },
        });
    };

    return (
        <header className={`fixed top-0 z-50 w-full grid grid-cols-3 justify-between ${show ? `bg-white` : `bg-transparent`} ${show ? `shadow-md` : `shadow-sm`} p-5 md:px-10 transition ease-in duration-200`}>
            {/* Left */}
            <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c513.png"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div className={`flex items-center md:border-2 rounded-full py-2 md:shadow ${show ? `md:bg-transparent` : `md:bg-white`} hover:bg-gray-50`}>
                <input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`pl-5 flex-grow bg-transparent outline-none text-sm text-gray-600 ${show ? `placeholder-gray-400` : `placeholder-white`}md:placeholder-gray-400`} 
                type="text" 
                placeholder={placeholder || "Start your search"} />
                <SearchIcon className="h-8 hidden md:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            {/* Right */}
            <div className={`flex items-center justify-end space-x-4 ${show ? `text-gray-500` : `text-white`}`}>
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className={`flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md ${show ? `bg-transparent` : `bg-white`} text-gray-500`}>
                    <MenuIcon className="h-6 cursor-pointer"/>
                    <UserCircleIcon className="h-6 cursor-pointer"/>
                </div>
            </div>

            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto bg-white rounded-2xl p-2 shadow-2xl mt-3">
                    <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]}
                    onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4 p-2">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>

                        <UsersIcon className="h-8"/>
                        <input 
                        value={noOfGuests}
                        onChange={(e) => setNoOfGuests(e.target.value)}
                        type="number" 
                        min={1}
                        className="w-12 pl-2 text-lg outline-none text-red-400" 
                        />
                    </div>
                    <div className="flex p-3 pt-0">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
