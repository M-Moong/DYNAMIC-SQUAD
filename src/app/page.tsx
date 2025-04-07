import ImageAnimation from '@/app/components/(imageAnimation)/page';

export default function Home() {
  return (
    <div className="relative">
      {/* Intro Page - First visible screen with higher z-index */}
      <div className="relative z-10 flex h-screen w-full items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 text-9xl">
        <div className="text-center">
          <span className="font-bold text-blue-400">Intro</span> Page
          <span className="text-blue-300">.</span>
          <div className="mt-8 text-lg text-gray-500">Scroll down to explore our projects</div>
        </div>

        <div className="absolute bottom-10 flex w-full justify-center">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium text-blue-400">Scroll Down</span>
            <div className="h-8 w-5 rounded-full border-2 border-blue-400 p-1">
              <div className="h-1 w-1 animate-bounce rounded-full bg-blue-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation starts after first screen */}
      <div className="relative top-[100vh]">
        <ImageAnimation />
      </div>

      {/* Final empty section - appears at the very end */}
      <div
        className="relative z-50 h-screen w-full bg-gradient-to-b from-slate-100 to-slate-200"
        style={{ marginTop: '400vh' }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center text-3xl text-gray-500">End of showcase</div>
        </div>
      </div>
    </div>
  );
}
