// hooks
import {useAppSelector} from '../../hooks'
// slices
// users
import {usersSelector} from '../../features/users/usersSlice'
export default function GetUsername({_id}: {_id: string}){
    // states
    // slices
    // users
    const users = useAppSelector(usersSelector)
    const isUser = users.find(user => user._id === _id)?.username
    return (
        <>{isUser || "Unknown"}</>
    )
}