// server/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Problem = require("./models/Problem");

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Problem.deleteMany();

  const problems = [
    // Arrays
    {
      title: "Two Sum",
      youtubeLink: "https://www.youtube.com/watch?v=0Fxc_jKj2vo&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/two-sum/",
      articleLink: "https://www.geeksforgeeks.org/two-sum-problem/",
      level: "Easy",
      chapter: "Arrays",
    },
    {
      title: "Maximum Subarray (Kadane’s Algorithm)",
      youtubeLink: "https://www.youtube.com/watch?v=w4W6yya1PIc&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/maximum-subarray/",
      articleLink: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
      level: "Medium",
      chapter: "Arrays",
    },
    {
      title: "Trapping Rain Water",
      youtubeLink: "https://www.youtube.com/watch?v=m18Hntz4go8&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/trapping-rain-water/",
      articleLink: "https://www.geeksforgeeks.org/trapping-rain-water/",
      level: "Hard",
      chapter: "Arrays",
    },

    // Strings
    {
      title: "Valid Anagram",
      youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/valid-anagram/",
      articleLink: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/",
      level: "Easy",
      chapter: "Strings",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      youtubeLink: "https://www.youtube.com/watch?v=T-Oj2Ajj9vA&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      articleLink: "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/",
      level: "Medium",
      chapter: "Strings",
    },
    {
      title: "Regular Expression Matching",
      youtubeLink: "https://www.youtube.com/watch?v=HAA8mgxlov8&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/regular-expression-matching/",
      articleLink: "https://www.geeksforgeeks.org/wildcard-pattern-matching/",
      level: "Hard",
      chapter: "Strings",
    },

    // Linked List
    {
      title: "Reverse Linked List",
      youtubeLink: "https://www.youtube.com/watch?v=ugQ2DVJJroc&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/reverse-linked-list/",
      articleLink: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
      level: "Easy",
      chapter: "Linked List",
    },
    {
      title: "Detect Cycle in Linked List",
      youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/linked-list-cycle/",
      articleLink: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
      level: "Medium",
      chapter: "Linked List",
    },
    {
      title: "LRU Cache",
      youtubeLink: "https://www.youtube.com/watch?v=7ABFKPK2hD4&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/lru-cache/",
      articleLink: "https://www.geeksforgeeks.org/lru-cache-implementation/",
      level: "Hard",
      chapter: "Linked List",
    },

    // Trees
    {
      title: "Binary Tree Level Order Traversal",
      youtubeLink: "https://www.youtube.com/watch?v=EoAsWbO7sqg&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      articleLink: "https://www.geeksforgeeks.org/level-order-tree-traversal/",
      level: "Easy",
      chapter: "Trees",
    },
    {
      title: "Diameter of Binary Tree",
      youtubeLink: "https://www.youtube.com/watch?v=ey7DYc9OANo&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/diameter-of-binary-tree/",
      articleLink: "https://www.geeksforgeeks.org/diameter-of-a-binary-tree/",
      level: "Medium",
      chapter: "Trees",
    },
    {
      title: "Serialize and Deserialize Binary Tree",
      youtubeLink: "https://www.youtube.com/watch?v=-YbXySKJsX8&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
      articleLink: "https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/",
      level: "Hard",
      chapter: "Trees",
    },

    // Dynamic Programming
    {
      title: "Climbing Stairs",
      youtubeLink: "https://www.youtube.com/watch?v=NFJ3m9a1oJQ&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/climbing-stairs/",
      articleLink: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/",
      level: "Easy",
      chapter: "Dynamic Programming",
    },
    {
      title: "Longest Common Subsequence",
      youtubeLink: "https://www.youtube.com/watch?v=4kUO0gEzZ8k&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/longest-common-subsequence/",
      articleLink: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
      level: "Medium",
      chapter: "Dynamic Programming",
    },
    {
      title: "Word Break II",
      youtubeLink: "https://www.youtube.com/watch?v=RPeTftFgsbw&ab_channel=ApnaCollege",
      leetCodeLink: "https://leetcode.com/problems/word-break-ii/",
      articleLink: "https://www.geeksforgeeks.org/word-break-problem-dp-32/",
      level: "Hard",
      chapter: "Dynamic Programming",
    },
  ];

  await Problem.insertMany(problems);

  console.log("seeded successfully");
  process.exit();
}

seed();
