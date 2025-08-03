'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import userefetch from '@/hooks/use-refetch';
import { api } from '@/trpc/react';
import { create } from 'domain';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormInput = {
    repoUrl: string;
    projectName: string;
    githubToken?: string;
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()    
    const refetch = userefetch()


    function onSubmit(data : FormInput){
        
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken,
        },{
            onSuccess: () =>{
                toast.success('Project created successfully!');
                refetch()
                reset()
            },
            onError: () => {
                toast.error('Failed to create project. Please try again.');
            }
            
        })
        return true
    }
    return (
        <div className='flex items-center justify-center min-h-full p-8'>
            <div className='flex items-center gap-12 max-w-4xl w-full'>
                <img src='/Link repo.png' className='h-56 w-auto flex-shrink-0'/> 

                <div className='flex-1'>
                    
                    <div className='mb-6'>
                        <h1 className='font-semibold text-2xl'>
                            Link Your Github Repository
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Enter the URL of your repository to link it with CodePulse.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <Input 
                            {...register("projectName", {required: true})}
                            placeholder="Project Name"
                            required
                        />

                        <Input 
                            {...register("repoUrl", {required: true})}
                            placeholder="Github URL"
                            type='url'
                            required
                        />

                        <Input 
                            {...register("githubToken", {required: true})}
                            placeholder="Github Token (Optional)"
                            required
                        />

                        <Button type='submit' disabled = {createProject.isPending}>
                            Create Project
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePage