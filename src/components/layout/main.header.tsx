'use client';

import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthActions } from '@/hooks/auth/use-auth-actions';
import { User } from '@/types/user.type';

import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

interface Props {
  user: User;
}

export function MainHeader({ user }: Props) {
  const { handleLogout } = useAuthActions({});

  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-black/20 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/70 text-white hover:bg-black/90 disabled:opacity-30"
          onClick={router.back}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/70 text-white hover:bg-black/90 disabled:opacity-30"
          onClick={router.forward}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 bg-black/70 px-2 text-white hover:bg-black/90">
              <Avatar className="h-6 w-6">
                <AvatarImage src={'/images/user-avatar.webp'} alt={user.displayName} />
                <AvatarFallback className="bg-gray-600 text-xs text-white">
                  {user.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium">{user.displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-gray-700 bg-gray-800">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-white">{user.displayName}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
              {user.isAdmin && <p className="text-xs font-medium text-primary">Administrador</p>}
            </div>

            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
