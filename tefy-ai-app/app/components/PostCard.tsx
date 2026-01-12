export default function PostCard({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow transition hover:shadow-lg">
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-500 mt-1 text-sm">5 min read</p>
    </div>
  );
}
