// hooks
import {useAppSelector} from '../../hooks'
// slices
// users
import {usersSelector} from '../../features/users/usersSlice'
export default function GetUsername({_id,flag}: {_id: string,flag?:string}){
    // states
    // slices
    // users
    const users = useAppSelector(usersSelector)
    const isUser = users.find(user => user._id === _id)
    if(flag === "ema"){
        return <>{isUser?.email || "unknown"}</>
    }
    return (
        <>{isUser?.username || "Unknown"}</>
    )
}