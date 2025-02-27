export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center h-full w-full"
    >
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
