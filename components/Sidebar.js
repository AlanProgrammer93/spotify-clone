import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import userSpotify from '../hooks/userSpotify'

function Sidebar() {
    const spotifyApi = userSpotify()
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])
    
    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll 
         scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Inicio</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Buscar</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Tu Lista</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Crear PlayList</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Cansiones Favoritas</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Tus Episodios</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {
                    playlists.map(playlist => (
                        <p 
                            key={playlist.id} 
                            className='cursor-pointer hover:text-white'
                            onClick={() => setPlaylistId(playlist.id)}
                        >
                            {playlist.name}
                        </p>
                    ))
                }

            </div>
        </div>
    )
}

export default Sidebar
