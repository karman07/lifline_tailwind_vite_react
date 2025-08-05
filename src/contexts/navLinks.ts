import {
  Users,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Mic2,
  Landmark,
  Presentation,
  LibraryBig,
  BookMarked,
  UserCheck,
  MessageSquareQuote,
  School,
  Music,
} from "lucide-react";

export const NAV_LINKS = [
  { name: "Users", to: "/users", icon: Users },
  { name: "Books", to: "/books", icon: BookOpen },
  { name: "Course", to: "/course", icon: GraduationCap },
  { name: "Research", to: "/research", icon: FlaskConical },
  { name: "Podcast", to: "/podcast", icon: Mic2 },
  { name: "Admin Positions", to: "/admin-positions", icon: Landmark },
  { name: "Workshops", to: "/workshops", icon: Presentation },
  { name: "Journals", to: "/journals", icon: LibraryBig },
  { name: "Chapters", to: "/chapters", icon: BookMarked },
  { name: "Subscribers", to: "/subscribers", icon: UserCheck },
  { name: "Testimonials", to: "/testimonials", icon: MessageSquareQuote },
  { name: "Students", to: "/students", icon: School },
  { name: "Poems & Songs", to: "/poems", icon: Music }
];
