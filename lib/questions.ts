export interface Question {
  id: number;
  key: string;
  type: "text" | "choice" | "textarea" | "multi-choice";
  label: string;
  placeholder?: string;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    key: "name",
    type: "text",
    label: "Please enter your Full Name",
    placeholder: "Your full name",
  },
  {
    id: 2,
    key: "phoneNo",
    type: "text",
    label: "Phone Number*",
    placeholder: "08123456789"
  },
  {
    id: 3,
    key: "email",
    type: "text",
    label: "Your Email Address?",
    placeholder: "hello@youremail.com",
  },
  {
    id: 4,
    key: "age",
    type: "text",
    label: "Your Age*",
    placeholder: "Current Age",
  },
  {
    id: 5,
    key: "gender",
    type: "choice",
    label: "Gender",
    options: [
      "Not Prefer to Say",
      "Female",
      "Male",
    ],
  },
  {
    id: 6,
    key: "city",
    type: "text",
    label: "Which city do you call home?",
    placeholder: "e.g. Mumbai, Delhi, Bangalore…"
  },
  {
    id: 7,
    key: "role",
    type: "choice",
    label: "How would you describe yourself?",
    options: [
      "Creative / Artist",
      "Professional / Entrepreneur",
      "Explorer / Adventurer",
      "Something else entirely",
    ],
  },
  {
    id: 8,
    key: "instagram",
    type: "text",
    label: "Your's Instagram Handle*",
    placeholder: "Your Insta handle",
  },
  {
    id: 9,
    key: "experience",
    type: "multi-choice",
    label: "Which of these experiences resonate most to you?",
    options: [
        "Pottery & Craft",
        "Food & Culinary Culture",
        "Wellness & Reflection",
        "Nature & Slow Travel",
        "Music & Cultural Immersion",
        "Creative Workshops",
    ],
  },
  {
    id: 10,
    key: "hobbies",
    type: "textarea",
    label: "Name 2 of your hobbies or interests?",
    placeholder: "Your Hobbies",
  },
  {
    id: 11,
    key: "motivation",
    type: "textarea",
    label: "In one sentence, what are you currently seeking through travel?",
    placeholder: "Your Answer",
  },
];