// pages/index.js
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import jwt from "jsonwebtoken";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";

export async function getServerSideProps({ req }) {
  const token = req.cookies?.token || null;

  if (!token) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { props: { email: decoded.email } };
  } catch {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }
}

export default function Dashboard({ email }) {
  const [problems, setProblems] = useState([]);
  const [openChapters, setOpenChapters] = useState({});

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await api.get("/api/problems/get-problems");
      setProblems(res.data);

      // collapsed by default
      const grouped = res.data.reduce((acc, p) => {
        if (!acc[p.chapter]) acc[p.chapter] = false;
        return acc;
      }, {});
      setOpenChapters(grouped);
    };
    fetchProblems();
  }, []);

  const toggleProgress = async (problemId, completed) => {
    await api.post("/api/problems/progress", { problemId, completed });
    setProblems((prev) =>
      prev.map((p) => (p._id === problemId ? { ...p, completed } : p))
    );
  };

  // Group problems by chapter
  const grouped = problems.reduce((acc, p) => {
    if (!acc[p.chapter]) acc[p.chapter] = [];
    acc[p.chapter].push(p);
    return acc;
  }, {});

  // Global progress
  const total = problems.length;
  const completed = problems.filter((p) => p.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Difficulty progress
  const difficulties = ["Easy", "Medium", "Hard"];
  const difficultyStats = difficulties.map((level) => {
    const items = problems.filter((p) => p.level === level);
    const done = items.filter((p) => p.completed).length;
    return { level, done, total: items.length };
  });

  const handleToggleChapter = (chapter) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapter]: !prev[chapter],
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header email={email} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🎯 My Progress</h1>

        {/* Global Progress */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>
              {completed}/{total} Completed
            </span>
            <span>{percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Difficulty Progress */}
        <div className="mb-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {difficultyStats.map(({ level, done, total }) => {
            const percent = total > 0 ? Math.round((done / total) * 100) : 0;
            const color =
              level === "Easy"
                ? "bg-green-500"
                : level === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500";
            return (
              <div key={level} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{level}</span>
                  <span className="text-sm">
                    {done}/{total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Problems by Chapter */}
        {Object.keys(grouped).map((chapter) => {
          const chapterProblems = grouped[chapter];
          const done = chapterProblems.filter((p) => p.completed).length;
          const isOpen = openChapters[chapter] ?? false;

          return (
            <div key={chapter} className="mb-6">
              <div
                className="flex justify-between items-center bg-white rounded-lg shadow px-4 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleToggleChapter(chapter)}
              >
                <h2 className="text-lg font-semibold">{chapter}</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {done}/{chapterProblems.length} Done
                  </span>
                  <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expand/Collapse with animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={chapter}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4"
                  >
                    {chapterProblems.map((problem) => (
                      <div
                        key={problem._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="font-semibold text-lg mb-3 flex justify-between items-center">
                            {problem.title}
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                problem.level === "Easy"
                                  ? "bg-green-100 text-green-600"
                                  : problem.level === "Medium"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {problem.level}
                            </span>
                          </h3>
                          <div className="space-x-3 text-sm mb-3">
                            {problem.youtubeLink && (
                              <a
                                href={problem.youtubeLink}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                YouTube
                              </a>
                            )}
                            {problem.leetCodeLink && (
                              <a
                                href={problem.leetCodeLink}
                                className="text-green-600 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                LeetCode
                              </a>
                            )}
                            {problem.articleLink && (
                              <a
                                href={problem.articleLink}
                                className="text-purple-600 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Article
                              </a>
                            )}
                          </div>
                        </div>

                        <label className="flex items-center space-x-2 mt-auto cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!problem.completed}
                            onChange={(e) =>
                              toggleProgress(problem._id, e.target.checked)
                            }
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">
                            {problem.completed ? "Done ✅" : "Pending"}
                          </span>
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
