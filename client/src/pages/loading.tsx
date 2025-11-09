import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}

export default Loading;
