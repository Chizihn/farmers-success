import OwnerDetails from "@/components/OwnerDetails";

interface OwnerDetailPageProps {
  params: { id: string };
}

export default function OwnerDetailPage({ params }: OwnerDetailPageProps) {
  return <OwnerDetails id={params.id} />;
}
