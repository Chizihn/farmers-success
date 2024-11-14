import Image from "next/image";
import { useFetchOwners } from "@/hooks/useOwners";

interface OwnerDetailsProps {
  id: string;
}

const OwnerDetails = ({ id }: OwnerDetailsProps) => {
  const owners = useFetchOwners();
  const owner = owners.find((o) => o.id === id);

  if (!owner) return <div>Owner not found</div>;

  return (
    <div>
      <h1>
        {owner.firstName} {owner.lastName}
      </h1>
      <Image src={owner.profileImageUrl} alt={`${owner.firstName}'s profile`} />
      <p>ID: {owner.id}</p>
    </div>
  );
};
export default OwnerDetails;
