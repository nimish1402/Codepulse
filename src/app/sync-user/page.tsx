import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const SyncUser = async() => {
    const {userId} = await auth()
    if(!userId){
        throw new Error('User id not found')
    }
    const client = await  clerkClient()
    const user = await client.users.getUser(userId)

    if(!user.emailAddresses[0]?.emailAddress){
       return notFound()
    }

   await db.user.upsert({
        where: {
            emailAddress: user.emailAddresses[0].emailAddress // Remove nullish coalescing since you already checked
        },
        update: {
            imageUrl: user.imageUrl ?? null, // Explicit null if undefined is possible
            firstName: user.firstName ?? null,
            lastName: user.lastName ?? null,
        },
        create: {
            id: user.id,
            emailAddress: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl ?? null,
            firstName: user.firstName ?? null,
            lastName: user.lastName ?? null,
        }
        });
    return redirect('/dashboard')
}
export default SyncUser