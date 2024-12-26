type ButtonProps = {
	text: string;
	onClick: () => void;
	className?: string;
};

export default function BorderMagicButton({
	text,
	onClick,
	className,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`relative inline-flex overflow-hidden rounded-full p-[1px] w-[60%] h-[50%] ${className}`}
		>
			<span
				className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`}
			/>
			<span
				className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 sm:px-9 sm:py-3 md:px-12 md:py-4 xl:px-16 xl:py-5 font-medium text-white hover:text-slate-300 backdrop-blur-3xl  text-xs sm:text-sm lg:text-base xl:text-xl`}
			>
				{text}
			</span>
		</button>
	);
}
