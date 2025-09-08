"use client"
import { useSession } from "next-auth/react"


export function SessionTest() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="p-4 bg-blue-100 rounded">Loading session ...</div>
  }
  if (status === 'unauthenticated') {
    return <div className="p-4 bg-red-100 rounded">
      <h3>Not authenticated</h3>
      <p>Status: {status}</p>
    </div>
  }
  if (status === "authenticated") {
    return (
      <div className="p-4 bg-green-100 rounded">
        <h3>Authenticated!</h3>
        <p>Status: {status}</p>
        <p>User: {session?.user?.email}</p>
        <p>Name: {session?.user?.name}</p>
        <pre className="mt-2 text-xs">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    )
  }
  return <div>Unknown status: {status}</div>
}
