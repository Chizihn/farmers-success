import OwnerDetails from "@/components/OwnerDetails";

interface OwnerDetailPageProps {
  params: { userId: string };
}

export default function OwnerDetailPage({ params }: OwnerDetailPageProps) {
  return <OwnerDetails userId={params.userId} />;
}
