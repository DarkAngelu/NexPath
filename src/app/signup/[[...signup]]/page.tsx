import React from "react";
import { SignUp } from "@clerk/nextjs";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const Signup = () => {
	return (
		<BackgroundBeamsWithCollision>
			<SignUp />
		</BackgroundBeamsWithCollision>
	);
};

export default Signup;
