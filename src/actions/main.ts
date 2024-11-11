"use server"

import {db} from "@/lib/pg"

 export async function getRelevantChunks(queryText:string) {
 
  
  try {
    
    const res = await db.query(
      "SELECT generate_rag_response($1)",
      [queryText]
    );
    
   console.log("res",res)

    let rawResponse = res.rows[0].generate_rag_response;

    // Remove the enclosing backticks and newlines, if any
    rawResponse = rawResponse.replace(/^```json\n/, '').replace(/\n```$/, '');

    // Parse the cleaned JSON string
    const parsedResponse = JSON.parse(rawResponse);

    console.log("Parsed Response:", parsedResponse);
    return parsedResponse;

  } catch (err:any) {
    console.error("Error executing query:", err.stack);
  } finally {
    // Close the database connection
    
  }
}

// Define a TypeScript interface for the project data structure
export interface Project {
  title: string;
  description: string;
  tech_stack: string[];
  contribution_needs: string[];
  tags: string[];
  project_stage: string; 
  
  github_repo_url: string;
  contact_email:string;
}


export async function addProject(project: Project): Promise<void> {
  try {
    const query = `
      INSERT INTO projects_new (
        title, description, tech_stack, contribution_needs, tags, project_stage, github_repo_url, contact_email
      ) VALUES ($1, $2, $3::text[], $4::text[], $5::text[], $6, $7, $8)
      RETURNING id;
    `;

    // Use destructuring to extract values from the project object
    const { title, description, tech_stack, contribution_needs, tags, project_stage, github_repo_url, contact_email } = project;

    // Pass the extracted values as an array to db.query
    const result = await db.query(query, [
      title,
      description,
      tech_stack,
      contribution_needs,
      tags,
      project_stage,
      github_repo_url,
      contact_email
    ]);

    console.log('New project added with ID:', result.rows[0].id);
  } catch (error) {
    console.error('Error adding project:', error);
  }
}

