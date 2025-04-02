// import Section1 from './(section1)/page';
// import Section2 from './(section2)/page';
// import Section3 from './(section3)/page';
// import Section4 from './(section4)/page';
// import Section5 from './(section5)/page';

import Section1 from './(section1)/page';

export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center text-9xl">
        <span className="font-bold text-blue-400">Intro</span> Page
        <span className="text-blue-300">.</span>
      </div>
      <Section1 />
      {/* <Section2 />
      <Section3 />
      <Section4 />
      <Section5 /> */}
    </>
  );
}
