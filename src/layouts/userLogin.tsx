export default function UserLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-[100vh] w-[100vw] bg-[#fbf9ff] flex justify-center items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-blob"></div>
<div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-blobSlow"></div>
<div className="absolute bottom-32 left-50 w-40 h-40 bg-green-500/10 rounded-full blur-xl animate-blobSlow"></div>
<div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-blob"></div>

      </div>
      <main className="w-[90%] md:w-[40%]">
        {children}
      </main>
    </div>
  );
}
