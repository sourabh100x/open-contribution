import { addProject } from '@/actions/main'
import { insertProjectsBatch } from '@/actions/seed'
import LinkButton from '@/components/LinkButton'
import ProjectBuilderForm from '@/components/ProjectBuilderForm'
import React from 'react'


const page = async () => {



  return (
<>

<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200">
  {/* Hero Section */}
  <div className="max-w-5xl mx-auto px-6">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight  py-10 text-center sm:font-extrabold mb-4 text-gray-100">
      Find Relevant Projects to Contribute To
    </h1>
    <p className="text-lg text-center mb-8 text-gray-300">
      RAG helps developers like you find projects that match your skills and interests. Whether you want to contribute to code, design, or documentation, we connect you to projects that need help.
    </p>
    <div className="space-x-6 items-center w-full flex justify-center">
      <LinkButton color="black" link="/project" text="Create Project" />
      <LinkButton color="white" link="/find" text="Find Project" />
    </div>
  </div>

  {/* Footer with Developer Logos */}
  <footer className="fixed bottom-0 left-0 w-full py-6 bg-opacity-75">
    <div className="container mx-auto px-6 text-center">
      <p className="text-lg mb-4 text-gray-400">Powered by a community of passionate developers</p>
      <div className="flex justify-center space-x-8 text-gray-300">
        Developed by 
        <span className="px-2 font-bold underline">
          <a href="/github" className="hover:text-gray-100">sourabh32</a>
        </span>
      </div>
    </div>
  </footer>
</div>

 


</>

  
  )
}

export default page