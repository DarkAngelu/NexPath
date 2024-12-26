type ButtonProps = {
	text: string;
	onClick: () => void;
	className?: string;
};

export default function ShimmerButton({
	text,
	onClick,
	className,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-1 focus:ring-offset-slate-400 ${className}`}
		>
			{text}
		</button>
	);
}
