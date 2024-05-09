"use client"
import GlobalDropDown from '@/components/common/GlobalDropDownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { firstCharacterOfFullName } from '@/utils/helper';
import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
const OrganizerAdminNavbar = () => {
    const [isFocus, setFocus] = useState(false);
    const user = useSelector((state: RootState) => state.user!);

    return (
        <div className='shadow-sm flex flex-col justify-between'>
            <div className='max-width flex justify-between my-4'>
                <div className="flex items-center gap-4 text-2xl font-bold">
                    <span className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'>
                        <BsThreeDots />
                    </span>
                    <span className='mx-0 p-0'>
                        Ticket
                        <span className='mx-0 p-0 text-red-500'>
                            Sathi
                        </span>
                    </span>
                </div>


                <div className={cn(`flex items-center rounded-2xl px-3 border w-[40%]`, { "border-gray-300 shadow-inner ": isFocus })}>
                    <Search
                        className={`mr-2 h-4 w-4 shrink-0 text-orange-400`}
                    />
                    <Input
                        placeholder="search"
                        className="flex w-full rounded-md bg-transparent text-sm outline-none border-none 
            focus:outline-none focus:border-none focus-visible:ring-0 placeholder:text-white"
                        onFocus={() => setFocus((prev) => !prev)}
                        onBlur={() => setFocus((prev) => !prev)}
                    />
                </div>

                {/* Right button */}
                <div className='flex items-center gap-5'>
                    {/* notification */}
                    <div className="border p-2 rounded-full relative">
                        <Bell />
                        <span className="w-fit block bg-red-500 text-white absolute
                     -top-2 -right-2 font-bold text-sm py-[0.1rem] px-[0.5rem] rounded-[50%]">1</span>
                    </div>

                    {/* login logout section */}
                    <div className="flex items-center gap-2">
                        <GlobalDropDown
                            display={
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{firstCharacterOfFullName(user.full_name)}</AvatarFallback>
                                </Avatar>
                            }
                            isBlack={false}
                            dropDownLists={undefined} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default OrganizerAdminNavbar