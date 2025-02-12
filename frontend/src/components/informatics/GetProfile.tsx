// hooks
import { useAppSelector } from "../../hooks";
// slices
// profiles
import { profilesSelector } from "../../features/profiles/profilesSlice";
export default function GetProfile({
  _id,
  flag,
}: {
  _id: string;
  flag: string;
}) {
  // states
  // slices
  // profiles
  const profiles = useAppSelector(profilesSelector);
  const isProfileExist = profiles
    .find((pro) => pro.user === _id)
    ?.profiles.find((pr) => pr.flag === flag)?.file;
  return (
    <img
      className="w-full h-full object-center object-cover"
      src={
        isProfileExist
          ? isProfileExist
          : flag === "pro"
          ? "/lm-pro.png"
          : "/lm-bg.jpg"
      }
    />
  );
}
