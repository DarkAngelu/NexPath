import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SignIn } from "@clerk/nextjs";

const Signin = () => {
	return (
		<BackgroundBeamsWithCollision>
			<SignIn />
		</BackgroundBeamsWithCollision>
	);
};

export default Signin;
