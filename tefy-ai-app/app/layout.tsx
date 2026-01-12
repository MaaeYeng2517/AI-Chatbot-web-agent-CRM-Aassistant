import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-gray-100 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen">
          <header className="p-4 border-b text-center">
            <h1 className="text-xl font-bold">
              Think Everyday For You
            </h1>
            <p className="text-sm text-gray-500">
              ความรู้ดี ๆ สำหรับทุกวัน
            </p>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
