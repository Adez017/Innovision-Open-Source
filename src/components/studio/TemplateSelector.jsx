"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Code, Lightbulb, CheckSquare, Brain, Rocket, Target, Zap, GraduationCap } from "lucide-react";

const TEMPLATES = [
  {
    id: "lesson",
    name: "Standard Lesson",
    icon: BookOpen,
    description: "Traditional lesson structure with intro, content, and summary",
    content: `# Lesson Title

## Introduction
Brief overview of what students will learn in this lesson.

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Main Content

### Topic 1
Detailed explanation of the first topic...

### Topic 2
Detailed explanation of the second topic...

## Key Takeaways
- Key point 1
- Key point 2
- Key point 3

## Practice Exercises
1. Exercise 1
2. Exercise 2

## Summary
Recap of what was covered in this lesson.`
  },
  {
    id: "tutorial",
    name: "Step-by-Step Tutorial",
    icon: Code,
    description: "Hands-on tutorial with code examples",
    content: `# Tutorial: [Topic Name]

## What You'll Build
Description of the final outcome...

## Prerequisites
- Prerequisite 1
- Prerequisite 2

## Step 1: Setup
Instructions for setting up...

\`\`\`javascript
// Code example
console.log("Hello World");
\`\`\`

## Step 2: Implementation
Detailed implementation steps...

\`\`\`javascript
// More code examples
\`\`\`

## Step 3: Testing
How to test your work...

## Troubleshooting
Common issues and solutions...

## Next Steps
What to learn next...`
  },
  {
    id: "concept",
    name: "Concept Explanation",
    icon: Lightbulb,
    description: "Deep dive into a specific concept",
    content: `# Understanding [Concept Name]

## What is it?
Clear definition of the concept...

## Why is it Important?
Real-world applications and relevance...

## How Does it Work?
Detailed explanation with examples...

## Common Misconceptions
- Misconception 1: Explanation
- Misconception 2: Explanation

## Examples

### Example 1
Detailed example with explanation...

### Example 2
Another example showing different use case...

## Practice Problems
1. Problem 1
2. Problem 2

## Further Reading
- Resource 1
- Resource 2`
  },
  {
    id: "assessment",
    name: "Assessment/Quiz",
    icon: CheckSquare,
    description: "Quiz or assessment template",
    content: `# Assessment: [Topic Name]

## Instructions
- Time limit: 30 minutes
- Total questions: 10
- Passing score: 70%

## Multiple Choice Questions

### Question 1
What is...?
- a) Option A
- b) Option B
- c) Option C
- d) Option D

**Answer:** [Correct answer]

### Question 2
Which of the following...?
- a) Option A
- b) Option B
- c) Option C
- d) Option D

**Answer:** [Correct answer]

## Short Answer Questions

### Question 3
Explain the concept of...

### Question 4
Describe how...

## Practical Exercise
Complete the following task...

## Grading Rubric
- Criteria 1: Points
- Criteria 2: Points
- Criteria 3: Points`
  },
  {
    id: "problem-solving",
    name: "Problem-Solving Guide",
    icon: Brain,
    description: "Structured approach to solving problems",
    content: `# Problem-Solving: [Problem Name]

## Problem Statement
Clear description of the problem...

## Understanding the Problem
- What are we trying to achieve?
- What constraints do we have?
- What information is given?

## Approach

### Method 1: [Approach Name]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

### Method 2: [Alternative Approach]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

## Step-by-Step Solution

### Step 1
Explanation...

### Step 2
Explanation...

### Step 3
Explanation...

## Verification
How to verify the solution is correct...

## Practice Problems
1. Similar problem 1
2. Similar problem 2`
  },
  {
    id: "project",
    name: "Project-Based Learning",
    icon: Rocket,
    description: "Complete project with milestones",
    content: `# Project: [Project Name]

## Project Overview
What you'll build and why it matters...

## Learning Goals
- Goal 1
- Goal 2
- Goal 3

## Project Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Milestone 1: Planning
- Task 1
- Task 2

## Milestone 2: Development
- Task 1
- Task 2

## Milestone 3: Testing
- Task 1
- Task 2

## Milestone 4: Deployment
- Task 1
- Task 2

## Evaluation Criteria
- Criterion 1: Weight
- Criterion 2: Weight
- Criterion 3: Weight

## Resources
- Resource 1
- Resource 2

## Submission Guidelines
Instructions for submitting the project...`
  },
  {
    id: "case-study",
    name: "Case Study Analysis",
    icon: FileText,
    description: "Real-world case study examination",
    content: `# Case Study: [Case Name]

## Background
Context and background information...

## The Situation
Description of the scenario...

## Key Players
- Person/Organization 1: Role
- Person/Organization 2: Role

## Challenges Faced
1. Challenge 1
2. Challenge 2
3. Challenge 3

## Solutions Implemented
### Solution 1
Description and outcome...

### Solution 2
Description and outcome...

## Results
- Result 1
- Result 2
- Result 3

## Lessons Learned
- Lesson 1
- Lesson 2
- Lesson 3

## Discussion Questions
1. What would you have done differently?
2. How can these lessons apply to other situations?

## Further Analysis
Additional points to consider...`
  },
  {
    id: "quick-reference",
    name: "Quick Reference Guide",
    icon: Zap,
    description: "Cheat sheet or quick reference",
    content: `# Quick Reference: [Topic]

## Essential Concepts
- **Concept 1:** Brief explanation
- **Concept 2:** Brief explanation
- **Concept 3:** Brief explanation

## Common Commands/Syntax

### Category 1
\`\`\`
command1 - Description
command2 - Description
\`\`\`

### Category 2
\`\`\`
command3 - Description
command4 - Description
\`\`\`

## Best Practices
1. Practice 1
2. Practice 2
3. Practice 3

## Common Mistakes to Avoid
- ❌ Mistake 1
- ❌ Mistake 2
- ❌ Mistake 3

## Helpful Tips
- 💡 Tip 1
- 💡 Tip 2
- 💡 Tip 3

## Additional Resources
- Resource 1
- Resource 2`
  },
  {
    id: "theory",
    name: "Theory & Fundamentals",
    icon: GraduationCap,
    description: "Theoretical foundation and principles",
    content: `# Theory: [Topic Name]

## Introduction
Overview of the theoretical concept...

## Historical Context
How this theory developed...

## Core Principles

### Principle 1
Detailed explanation...

### Principle 2
Detailed explanation...

### Principle 3
Detailed explanation...

## Mathematical Foundation
Key formulas and equations...

## Applications
Where this theory is applied...

## Limitations
What this theory cannot explain...

## Related Theories
- Theory 1: Relationship
- Theory 2: Relationship

## Modern Developments
Recent advances in this field...

## Further Study
Recommended reading and resources...`
  },
  {
    id: "interactive",
    name: "Interactive Exercise",
    icon: Target,
    description: "Hands-on practice with immediate feedback",
    content: `# Interactive Exercise: [Topic]

## Objective
What you'll practice in this exercise...

## Setup
What you need before starting...

## Exercise 1: [Name]

**Task:**
What to do...

**Expected Output:**
What the result should look like...

**Hints:**
- Hint 1
- Hint 2

**Solution:**
> Click to reveal solution
> \`\`\`
> Solution code or explanation
> \`\`\`

## Exercise 2: [Name]

**Task:**
What to do...

**Expected Output:**
What the result should look like...

**Hints:**
- Hint 1
- Hint 2

**Solution:**
> Click to reveal solution
> \`\`\`
> Solution code or explanation
> \`\`\`

## Challenge Exercise

**Task:**
Advanced challenge...

**Requirements:**
- Requirement 1
- Requirement 2

## Self-Assessment
- [ ] I can do task 1
- [ ] I can do task 2
- [ ] I can do task 3

## Next Steps
What to practice next...`
  }
];

export default function TemplateSelector({ onSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Templates</CardTitle>
        <CardDescription>Choose a template to get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <Card
                key={template.id}
                className="cursor-pointer hover:border-blue-400 transition-all"
                onClick={() => onSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
