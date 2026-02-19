export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl gold-gradient animate-spin mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-display font-bold text-base">R</span>
        </div>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
