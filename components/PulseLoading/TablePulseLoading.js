export default function TablePulseLoading() {
  return (
    <div className="space-y-3 w-full">
      <div className="grid grid-cols-6 gap-4">
        <div className="animate-pulse h-8 bg-primary rounded col-span-2"></div>
        <div className="animate-pulse h-2 bg-transparent rounded col-span-4"></div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="animate-pulse h-3 bg-transparent rounded col-span-4"></div>
        <div className="animate-pulse h-8 bg-primary rounded col-span-1"></div>
      </div>
      <div className="animate-pulse h-80 bg-primary rounded-lg"></div>
      <div className="grid grid-cols-8 gap-4">
        <div className="animate-pulse h-8 bg-primary rounded col-span-2"></div>
        <div className="animate-pulse h-3 bg-transparent rounded col-span-4"></div>
        <div className="animate-pulse h-8 bg-primary rounded col-span-2"></div>
      </div>
    </div>
  )
}