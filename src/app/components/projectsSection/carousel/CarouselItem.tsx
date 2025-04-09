import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  bg: string;
}

export default function CarouselItem({ project }: { project: Project }) {
  return (
    <div className={`relative h-96 w-[50%] shrink-0 grow-0 ${project.bg}`}>
      <Image src={project.bg} fill alt={`${project.title} 이미지`} className="object-cover" />
    </div>
  );
}
