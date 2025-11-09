import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center flex flex-col gap-4 text-4xl font-semibold text-gray-700">
      Page not found 404
      <Button size="lg" variant="custom-gradient" asChild>
        <a href="/">Home</a>
      </Button>
    </div>
  );
}

export default NotFound;
