"use client"
import { useAuthStore } from "@/store/authStore";

export default function Dashboard(){

    const { user } = useAuthStore.getState()

    return(
        <div className="grid grid-cols-1 gap-4">
            <span>Greeting, halo {user?.username}</span>

            <span>Ada Notifikasi semisal dia punya konsul dan harus jawab konsul jadi jawab konsul bisa dari dashboard aja</span>
        </div>
    )
}