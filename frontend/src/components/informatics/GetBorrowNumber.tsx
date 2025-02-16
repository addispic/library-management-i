import { useEffect } from "react";
// hooks
import { useAppSelector } from "../../hooks";
// slices
// borrows
import { borrowsSelector } from "../../features/borrows/borrowsSlice";
export default function GetBorrowNumber({
  total,
  _id,
}: {
  total: number;
  _id: string;
}) {
  // states
  // slices
  // borrows
  const borrows = useAppSelector(borrowsSelector);
  let isBorrowed = borrows.find((br) => br.book === _id)?.borrows?.length || 0;
  // effects
  useEffect(() => {
    isBorrowed = borrows.find((br) => br.book === _id)?.borrows?.length || 0;
  }, [borrows]);
  return (
    <div className="flex items-center gap-x-1.5 text-sm">
      <div className="px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
        <span>{total} total</span>
      </div>
      <div className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-500">
        <span>{total - isBorrowed} available</span>
      </div>
    </div>
  );
}
