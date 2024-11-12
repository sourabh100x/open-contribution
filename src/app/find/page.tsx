import LinkButton from "@/components/LinkButton";
import ProjectBuilderForm from "@/components/ProjectBuilderForm"

export default function Page() {
  return (
    <div className="min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center py-10 px-5 sm:px-20 text-gray-200">
  <div className="flex w-full items-center justify-start mb-6">
    <LinkButton color="white" text="Home" link="/" />
  </div>
  
  <ProjectBuilderForm />
</div>

  );
}


