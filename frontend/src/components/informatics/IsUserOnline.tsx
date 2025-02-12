// hooks
import { useAppSelector } from "../../hooks";
// slices
// users
import { onlineUsersSelector } from "../../features/users/usersSlice";
export default function IsUserOnline({ _id }: { _id: string }) {
  // states
  // slices
  // users
  const onlineUsers = useAppSelector(onlineUsersSelector);

  const isUserOnline = onlineUsers.find((user) => user._id === _id);
  return (
    <div
      className={`absolute right-0 bottom-0 w-[7px] aspect-square rounded-full  ${
        isUserOnline ? "bg-green-500" : "bg-neutral-400"
      }`}
    />
  );
}
