import React, { useState, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { jsPDF } from "jspdf";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeContext from "@/utils/Context";
import { generate } from "@/utils/contanst";
import chatSession from "@/utils/geminiAi";

const LessonPlanner = () => {
  const topic = useRef(null);
  const gradeLevel = useRef(null);
  const mainConcept = useRef(null);
  const materials = useRef(null);
  const objectives = useRef(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);

  function downloadPDF() {
    if (!generatedContent) return;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(generatedContent, 10, 10);
    doc.save("lesson_plan.pdf");
  }

  // Generate Lesson using AI
  const generateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = generate(topic.current.value, gradeLevel.current.value, mainConcept.current.value, materials.current.value, objectives.current.value);
    try {
      const result = await chatSession.sendMessage(prompt);
      setGeneratedContent(result.response.text());
    } catch (error) {
      console.error("Error generating lesson:", error);
    }
    setLoading(false);
  };

  return (
    <div className={`w-full ${isDark ? "bg-[#2b2b2b] " : "bg-white"}`}>
      <div className="p-3">
        <Button
          onClick={() => setIsDark(!isDark)}
          className={`px-4 py-2 ${
            isDark
              ? "bg-white text-black hover:bg-[#d3d3d3]"
              : "bg-black text-white hover:bg-[#565656]"
          } rounded-lg `}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <div
        className={`w-[50%] mx-auto p-6  rounded-md ${
          isDark ? "bg-gray-200 " : "bg-gray-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          AI-Powered Lesson Planner
        </h2>

        <form
          onSubmit={(e) => generateLesson(e)}
          className={`p-6 rounded-lg shadow-[0px_0px_15px_rgba(0,0,0,0.3)] ${
            isDark ? "bg-[#2b3350] text-white" : "bg-white"
          }`}
        >
          <div className="mb-4">
            <label className="block  font-medium">Topic</label>
            <Input
              ref={topic}
              type={"text"}
              placeholder={"Enter Lesson Topic"}
              className={"border-[2px] border-gray-400 bg-transparent"}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium">Grade Level</label>
            <Input
              type={"text"}
              ref={gradeLevel}
              placeholder={"Enter Grade Level"}
              className={"border-[2px] border-gray-400 bg-transparent"}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium">
              Main Concept & Subtopics
            </label>
            <Textarea
              ref={mainConcept}
              placeholder={"Enter Concepts & Subtopics"}
              className={"border-[2px] border-gray-400 bg-transparent"}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium">Materials Needed</label>
            <Textarea
              ref={materials}
              placeholder={"Enter Required Materials"}
              className={"border-[2px] border-gray-400 bg-transparent"}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block  font-medium">Learning Objectives</label>
            <Textarea
              ref={objectives}
              placeholder={"Enter Learning Objectives"}
              className={"border-[2px] border-gray-400 bg-transparent"}
              required
            />
          </div>

          <Button
            type={"submit"}
            className="w-full bg-blue-500 text-white py-2 px-4 text-lg font-semibold cursor-pointer rounded-lg hover:bg-blue-600"
          >
            {loading ? "Generating..." : "Generate Lesson Plan"}
          </Button>

          {loading && (
            <>
              <Skeleton className="w-[420px] bg-gray-600 h-[17px] mx-auto mt-4" />
              <Skeleton className="w-[300px] bg-gray-600 h-[17px] mx-auto mt-2" />
              <Skeleton className="w-[150px] bg-gray-600 h-[17px] mx-auto mt-2" />
            </>
          )}

          {generatedContent && (
            <div className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Lesson Outline (Editable)</AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="w-full border p-2 bg-transparent"
                      rows={22}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {generatedContent && (
            <Button
              className="w-full mt-4 bg-green-500 text-lg font-semibold cursor-pointer text-white py-2 rounded-lg hover:bg-green-600"
              onClick={downloadPDF}
            >
              Download as PDF
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LessonPlanner;
