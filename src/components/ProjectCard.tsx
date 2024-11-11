import React from "react";
import { Code, Mail, GitBranch, UserPlus, Tag } from "lucide-react"; // Import icons

export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="max-w-md mx-auto col-span-1 bg-white border border-gray-200 rounded-lg shadow-md p-6 my-4">
      {/* Project Title */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>

      {/* Project Description */}
      <p className="text-gray-600 mb-4">{project.description}</p>

      {/* Tags */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
          <Tag size={18} className="mr-2 text-gray-700" /> Tags:
        </h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full flex items-center"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
          <Code size={18} className="mr-2 text-blue-700" /> Tech Stack:
        </h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tech_stack.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Contribution Needs */}
      <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
          <UserPlus size={18} className="mr-2 text-green-600" /> Open for Contributions In:
        </h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.contribution_needs.map((need: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center"
            >
              {need}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-4 flex items-center gap-4">
        <a
          href={`mailto:${project.contact_email}`}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <Mail size={18} className="mr-1" /> {project.contact_email}
        </a>
        <a
          href={project.github_repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <GitBranch size={18} className="mr-1" /> repo
        </a>
      </div>
    </div>
  );
};




