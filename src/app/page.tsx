import ImageCarousel from './components/ImageCarousel';

export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center text-9xl">
        <span className="font-bold text-blue-400">Intro</span> Page
        <span className="text-blue-300">.</span>
      </div>
      <ImageCarousel />
    </>
  );
}
