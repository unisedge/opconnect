const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full w-full flex gap-y-10 items-center justify-center">
			{children}
		</div>
	);
};

export default MainLayout;
