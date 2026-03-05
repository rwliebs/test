export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
        <p className="text-lg text-gray-600">Organize your work efficiently</p>
      </header>

      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Welcome to Task Manager</p>
          <p className="text-gray-400">Task features will be loaded here</p>
        </div>
      </section>
    </div>
  );
}