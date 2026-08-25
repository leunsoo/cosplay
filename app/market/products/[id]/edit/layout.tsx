export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-5xl mx-auto pb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-border-color px-6 md:px-12 py-4">
        {/* 탭 메뉴 */}
        <div className="flex py-4 font-bold text-base transition-all relative text-primary border-b border-gray-200 mb-8">
          상품수정
        </div>

        {/* 페이지 컨텐츠 */}
        {children}
      </div>
    </main>
  );
}
