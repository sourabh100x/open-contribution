import { db } from "@/lib/pg"; // Import the pool configuration from db.js
import { projects } from "@/lib/dump"; // Import your array of project objects

type Project = {
  title: string;
  github_repo_url: string;
  description: string;
  contact_email: string;
  project_stage: string;
  contribution_needs: string[];
  tech_stack: string[];
  tags: string[];
};

// Helper function to insert projects in batches with a rate limit
export async function insertProjectsBatch() {
  try {
    const batchSize = 10; // Rate limit: 10 projects per second
    const delayMs = 1000 / batchSize; // Delay per project to maintain 10 requests per second
    
    // Function to insert a batch of projects
    const insertBatch = async (startIndex: number) => {
      const values: any[] = [];
      const valuePlaceholders = projects.slice(startIndex, startIndex + batchSize).map((project, i) => {
        const idx = i * 8; // Adjust index offset for each project
        values.push(
          project.title,
          project.github_repo_url,
          project.description,
          project.contact_email,
          project.project_stage,
          project.contribution_needs,
          project.tech_stack,
          project.tags
        );

        return `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5}, $${idx + 6}, $${idx + 7}, $${idx + 8})`;
      }).join(', ');

      // Construct the query string for batch insert
      const queryText = `
        INSERT INTO projects_new (
          title, github_repo_url, description, contact_email, project_stage, 
          contribution_needs, tech_stack, tags
        ) VALUES ${valuePlaceholders};
      `;

      // Execute the batch insert query
      await db.query(queryText, values);
    };

    // Loop through the projects array in batches
    for (let i = 0; i < projects.length; i += batchSize) {
      await insertBatch(i); // Insert each batch
      if (i + batchSize < projects.length) {
        // Wait for the next batch to maintain rate limit
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    console.log('All projects inserted successfully in batch');
  } catch (error) {
    console.error('Error inserting projects in batch:', error);
  }
}

