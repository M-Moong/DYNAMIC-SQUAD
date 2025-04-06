interface ProjectProps {
  id: number;
  title: string;
  bg: string;
}

export default function CarouselItem({ project }: { project: ProjectProps }) {
  return (
    <div className={`h-96 shrink-0 grow-0 basis-[50%] ${project.bg}`}>
      <div></div>
    </div>
  );
}
