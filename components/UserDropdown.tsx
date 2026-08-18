"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

const UserDropdown = () => {
	const router = useRouter();

	const handleSignOut = () => {
		router.push("/signin");
	};

	const user = {
		name: "John Doe",
		email: "john.doe@gmail.com",
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>{user.name[0]}</AvatarFallback>
						</Avatar>
						<div className="hidden md:flex flex-col items-start">
							<span className="text-base font-medium text-gray-400">{user.name}</span>
						</div>
					</Button>
				}
			/>
			<DropdownMenuContent className="w-full">
				<DropdownMenuGroup>
					<DropdownMenuLabel>
						<div className="flex relative items-center gap-3 py-2">
							<Avatar className="h-10 w-10">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-base font-medium text-gray-400">{user.name}</span>
								<span className="text-sm text-gray-500">{user.email}</span>
							</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator className="bg-gray-600" />
					<DropdownMenuItem
						onClick={handleSignOut}
						className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transitions-colors cursor-pointer"
					>
						<LogOut className="h-4 w-4 mr-2 hidden sm:block" />
						Logout
					</DropdownMenuItem>
					<DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
					<nav className="sm:hidden">
						<NavItems />
					</nav>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
