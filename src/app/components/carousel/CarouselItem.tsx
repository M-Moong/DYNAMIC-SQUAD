interface ProjectProps {
  id: number;
  title: string;
  bg: string;
}

export default function CarouselItem({ project }: { project: ProjectProps }) {
  return (
    <div className={`h-96 min-w-[60%] ${project.bg}`}>
      <div></div>
    </div>
  );
}
