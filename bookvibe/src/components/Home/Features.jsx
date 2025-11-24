export default function Features() {
  return (
    <section id="features" className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-base-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Curated Collections</h3>
          <p className="text-muted mt-2">Hand-picked selections to match moods and interests.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Fast Search</h3>
          <p className="text-muted mt-2">Find books quickly with search and category filters.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Manage Your Collection</h3>
          <p className="text-muted mt-2">Add and manage products with a simple interface.</p>
        </div>
      </div>
    </section>
  );
}
