import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SearchDialog = ({ open, setOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { suggestedUsers } = useSelector(store => store.auth);

    const filteredUsers = suggestedUsers.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Users</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Search username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                    <div className="max-h-96 overflow-y-auto space-y-2">
                        {searchQuery && filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <Link 
                                    key={user._id} 
                                    to={`/profile/${user._id}`}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                >
                                    <Avatar>
                                        <AvatarImage src={user.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.username}</p>
                                        <p className="text-sm text-gray-600">{user.bio || 'No bio'}</p>
                                    </div>
                                </Link>
                            ))
                        ) : searchQuery ? (
                            <p className="text-center text-gray-500">No users found</p>
                        ) : (
                            <p className="text-center text-gray-500">Start typing to search...</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog
