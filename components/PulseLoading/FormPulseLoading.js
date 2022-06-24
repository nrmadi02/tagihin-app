export default function FormPulseLoading() {
  return (
    <div className="space-y-3 w-full">
      <div className="grid grid-cols-6 gap-4">
        <div className="animate-pulse h-3 bg-primary rounded col-span-1"></div>
        <div className="animate-pulse h-2 bg-transparent rounded col-span-5"></div>
      </div>
      <div className="animate-pulse h-9 bg-primary rounded-lg"></div>
    </div>
  )
}