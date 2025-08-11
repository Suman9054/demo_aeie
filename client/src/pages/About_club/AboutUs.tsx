export default function AboutUs() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-800 via-indigo-900 to-blue-950 shadow-xl p-6 flex flex-col gap-4 border-r border-indigo-700">
        <h2 className="text-xl font-bold mb-4 text-white">About Menu</h2>
        <nav className="flex flex-col gap-2">
          {["Institute", "Department", "Faculty", "Technical Staff", "Commitee", "ISA"].map(
            (item) => (
              <button
                key={item}
                className="text-left px-4 py-2 rounded-lg font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                {item}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-lg leading-relaxed max-w-3xl text-gray-100">
          Welcome to the Department of Applied Electronics & Instrumentation Engineering.
          Here you'll find information about our history, mission, faculty, and more.
        </p>
      </main>
    </div>
  );
}
