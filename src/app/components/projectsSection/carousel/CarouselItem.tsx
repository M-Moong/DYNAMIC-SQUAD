interface Project {
  id: number;
  title: string;
  bg: string;
}

export default function CarouselItem({ project }: { project: Project }) {
  return (
    <div className={`h-96 w-[50%] shrink-0 grow-0 ${project.bg}`}>
      <div></div>
    </div>
  );
}
