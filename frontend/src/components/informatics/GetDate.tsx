
import {formatDistanceToNow} from 'date-fns'
export default function GetDate({date}: {date: string}){
    return (
        <>{formatDistanceToNow(new Date(date),{addSuffix: true})}</>
    )
}