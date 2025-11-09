interface StatCardProps {
  count: number;
  label: string;
  className?: string;
}

export default function StatCard({ count, label, className }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className={`text-2xl font-bold ${className}`}>{count}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
