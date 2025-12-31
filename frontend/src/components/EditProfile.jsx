import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import { authAPI } from '@/lib/api';

const EditProfile = () => {
    const imageRef = useRef();
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }


    const editProfileHandler = async () => {
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if(input.profilePhoto){
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await authAPI.editProfile(formData);
            if(res.data.success){
                const updatedUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally{
            setLoading(false);
        }
    }
    return (
        <div className='flex max-w-2xl mx-auto px-4 sm:px-6 lg:pl-10'>
            <section className='flex flex-col gap-4 sm:gap-6 w-full my-4 sm:my-8'>
                <h1 className='font-bold text-lg sm:text-xl'>Edit Profile</h1>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 rounded-xl p-3 sm:p-4 gap-3 sm:gap-0'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='h-12 w-12 sm:h-16 sm:w-16'>
                            <AvatarImage src={user?.profilePicture} alt="post_image" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                            <h1 className='font-bold text-sm sm:text-base truncate'>{user?.username}</h1>
                            <span className='text-gray-600 text-xs sm:text-sm truncate block'>{user?.bio || 'Bio here...'}</span>
                        </div>
                    </div>
                    <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
                    <Button 
                        onClick={() => imageRef?.current.click()} 
                        className='bg-[#0095F6] h-8 hover:bg-[#318bc7] text-xs sm:text-sm px-3 sm:px-4 w-full sm:w-auto'
                    >
                        Change photo
                    </Button>
                </div>
                <div>
                    <h1 className='font-bold text-base sm:text-xl mb-2'>Bio</h1>
                    <Textarea 
                        value={input.bio} 
                        onChange={(e) => setInput({ ...input, bio: e.target.value })} 
                        name='bio' 
                        className="focus-visible:ring-transparent text-sm sm:text-base" 
                        rows={3}
                    />
                </div>
                <div>
                    <h1 className='font-bold mb-2 text-base sm:text-lg'>Gender</h1>
                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        <SelectTrigger className="w-full h-10 text-sm sm:text-base">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-end'>
                    {
                        loading ? (
                            <Button className='w-full sm:w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-sm'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                onClick={editProfileHandler} 
                                className='w-full sm:w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-sm'
                            >
                                Submit
                            </Button>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default EditProfile