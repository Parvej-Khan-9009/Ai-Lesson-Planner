export const LOGIN_IMG =
  "https://static.vecteezy.com/system/resources/previews/006/405/794/non_2x/account-login-flat-illustration-vector.jpg";

export function generate(topic, grade, mainConcept, materials, objectives) {
  const prompt = `You are an expert in curriculum design. Generate a structured lesson plan using the given inputs. The response must strictly follow this format:
    
    📖 LESSON PLAN
    
    **Topic:** ${topic}
    **Summary:** (A 2-line summary of the lesson)
    **Date:** (Leave blank for user input)
    **Subject:** (Based on topic)
    **Grade Level:** ${grade}
    **Main Topic & Sub Topics / Unit:** ${mainConcept}
    
    **Materials Needed:**
    - ${materials}
    - Any objects for demonstration
    - References for preparation
    
    **Learning Objectives:**
    - ${objectives}
    - At least two outcomes based on Bloom’s Taxonomy.
    
     **Lesson Outline** (Expandable Sections)
    
    **1 Springboard Activity:** (Engaging question or activity to introduce the lesson)
    **2 Introduction:** (Brief overview or continuation from the last lesson)
    **3 Review of Previous Concepts:** (If necessary)
    **4 Main Discussion:** (Detailed explanation of the topic)
    **5 Activities:** (Hands-on or group activities to reinforce learning)
    **6 Assessment/Evaluation:** (How students will be assessed)
    **7 Other Elements:** (Any additional notes, reflections, or reminders)
    
    Dont use emojis, Keep the response **concise, structured, and easy to read.**`;

    return prompt;
}
