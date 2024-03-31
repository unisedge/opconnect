const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      {children}
    </div>
  );
};

export default DashboardLayout;
