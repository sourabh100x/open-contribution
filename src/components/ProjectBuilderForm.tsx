"use client"
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {Switch} from "@headlessui/react";
import { getRelevantChunks } from "@/actions/main";
import {ProjectCard} from "@/components/ProjectCard"
// Define types for the options
type ProjectType = "SaaS" | "Hackathon" | "WebApp" | "MobileApp" | "AI/ML Project";
type TechStack = "Python" | "JavaScript" | "React" | "Node.js" | "Django" | "Flask";
type ContributionArea =
  | "Backend Development"
  | "Frontend Development"
  | "Logo Design"
  | "Graphic Design"
  | "Generative AI"
  | "Testing"
  | "Documentation"
  | "DevOps";

const projectTypeOptions: ProjectType[] = ["SaaS", "Hackathon", "WebApp", "MobileApp", "AI/ML Project"];
const techStackOptions: TechStack[] = ["Python", "JavaScript", "React", "Node.js", "Django", "Flask"];
const contributionAreaOptions: ContributionArea[] = [
  "Backend Development",
  "Frontend Development",
  "Logo Design",
  "Graphic Design",
  "Generative AI",
  "Testing",
  "Documentation",
  "DevOps",
];

const ContributionForm: React.FC = () => {
  const [enabled,setEnabled] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [techStack, setTechStack] = useState<TechStack | "">("");
  const [contributionArea, setContributionArea] = useState<ContributionArea | "">("");
  const [customPrompt,setCustomPrompt] = useState<string>("")
  const [projects,setProjects] =useState([])
  const [loading,setLoading] = useState<boolean>(false)
  
  const handleSubmit = async () => {
    if (loading) return; 

    setLoading(true); 
    try {
      if (enabled) {
        if (customPrompt.length > 5) {
          const projects = await getRelevantChunks(customPrompt);
          console.log(projects)
          setProjects(projects)
        } else {
          alert("Please provide a longer prompt");
        }
      } else {
        if (projectName && projectType && techStack.length > 0 && contributionArea) {
          let prompt = `I want to contribute towards an ${projectName} for a ${projectType}. I have proficiency in ${techStack}, and I can contribute as a ${contributionArea}.`;

          const projects = await getRelevantChunks(prompt);
          setProjects(projects)
          
        } else {
          alert("Please fill in all the fields.");
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("There was an error fetching relevant projects. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (<>
    <div className=" mx-auto w-full mt-5 p-6 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center text-gray-900 justify-center gap-5">
      <span className="font-bold">prebuilt</span>
      <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-gray-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-gray-100 transition group-data-[checked]:translate-x-6" />
    </Switch>
    <span className="font-bold">custom</span>
      </div>
        
      <div className="my-5 min-h-[250px] transition-all duration-300">
  {enabled ? (
    <Textarea
      value={customPrompt}
      onChange={(e) => setCustomPrompt(e.target.value)}
      className="my-5 w-full p-2 rounded bg-gray-200 text-gray-900"
      placeholder="Type your message here."
    />
  ) : (
    <div className="my-5">
      <p className="text-lg font-semibold text-gray-700 mb-6 space-y-4 leading-relaxed">
        I want to contribute towards an{" "}
        <input
          type="text"
          placeholder="project name"
          className="border-b-2 text-gray-900 border-gray-500 px-2 py-1 focus:outline-none mb-4 "
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />{" "}
        for a{" "}
        <select
          className="border-b-2 text-gray-900 border-gray-500 px-2 py-1 focus:outline-none mb-4 "
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as ProjectType)}
        >
          <option value="">[Select Project Type]</option>
          {projectTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        . I have proficiency in{" "}
        <select
          className="border-b-2 text-gray-900 border-gray-500 px-2 py-1 focus:outline-none mb-4 "
          value={techStack}
          onChange={(e) => setTechStack(e.target.value as TechStack)}
        >
          {techStackOptions.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
        , and I can contribute as{" "}
        <select
          className="border-b-2 text-gray-900 border-gray-500 px-2 py-1 focus:outline-none mb-4 "
          value={contributionArea}
          onChange={(e) =>
            setContributionArea(e.target.value as ContributionArea)
          }
        >
          {contributionAreaOptions.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        .
      </p>
      <p className="text-sm text-gray-900 mb-6">
        <span className="font-semibold text-gray-900">Generated Prompt:</span>
        <code className="block bg-gray-200 text-gray-900  p-2 mt-2 rounded text-sm ">
          {`I want to contribute towards an ${
            projectName || "[project name]"
          } for a ${projectType || "[project type]"}. `}
          {`I have proficiency in ${techStack}, `}
          {`and I can contribute as ${
            contributionArea || "[contribution area]"
          }.`}
        </code>
      </p>
    </div>
  )}
</div>
     

      <button
      disabled={loading}
        onClick={handleSubmit}
        className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 w-auto mx-auto"
      >
        {loading ? 'Loading...' :"search project"}
      </button>

      
    </div>
    <div className="grid grid-cols-3 my-10 gap-2">
    {
         projects  && projects.length > 0 && 
        projects.map((project) => <ProjectCard project={project} />)
      }

    </div>
    </>

  );
};

export default ContributionForm;
