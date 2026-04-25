import StoryDetailUI from "./StoryDetail";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StoryDetailUI id={id} />;
}
